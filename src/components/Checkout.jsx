import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { ProductContext } from "../context/ProductsContext";

const Checkout = () => {
    const { cart, setCart, removeFromCart, numberOfItemsInCart, cartTotal, setCartTotal, iva, setIva, grossTotal, setGrossTotal } = useContext(CartContext)
    const { allProducts, setAllProducts } = useContext(ProductContext);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        const totalQuantity = cart.reduce(function (quantity, product) {
            return quantity + (product.cantidad * product.precio);
        }, 0);
        setCartTotal(totalQuantity);
        const ivaQuantity = totalQuantity * 0.16;
        const grossTotalQuantity = totalQuantity - ivaQuantity;
        setIva(ivaQuantity);
        setGrossTotal(grossTotalQuantity);
    }, [cart]);

    const handleSubmit = () => {
        let nameInput = document.querySelector('#formName').value;
        let lastnameInput = document.querySelector('#formLastname').value;
        let phoneInput = document.querySelector('#formPhone').value
        let mailInput = document.querySelector('#formMail').value;
        let mailConfirmationInput = document.querySelector('#formMailConfirmation').value;

        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

        const isValid = nameInput && lastnameInput && phoneInput && mailInput && mailConfirmationInput;

        if (isValid) {
            if (mailInput === mailConfirmationInput) {
                const order = {
                    date: formattedDate,
                    buyer: { name: nameInput, lastname: lastnameInput, phone: phoneInput, email: mailInput },
                    items: cart,
                    total: cartTotal
                }

                const db = getFirestore();

                const ordersCollection = collection(db, "ordenes");
                addDoc(ordersCollection, order)
                    .then(({ id }) => {
                        setOrderId(id);
                        console.log(id); // Aquí imprime el id para verificar si está llegando correctamente
                        Swal.fire({
                            icon: "success",
                            title: "Orden recibida con éxito",
                            text: `Su codigo de orden es: ${id}`,
                        }).then(() => {
                            let updatedProducts = [...allProducts];
                            cart.forEach(item => {
                                const productIndex = updatedProducts.findIndex(product => product.id === item.id);
                                if (productIndex !== -1) {
                                    if (updatedProducts[productIndex].stock >= item.cantidad) {
                                        updatedProducts[productIndex].stock -= item.cantidad;
                                    }
                                }
                            });
                            setCart([]);
                            setAllProducts(updatedProducts);
                        });
                        document.querySelector('#formName').value = "";
                        document.querySelector('#formLastname').value = "";
                        document.querySelector('#formPhone').value = "";
                        document.querySelector('#formMail').value = "";
                        document.querySelector('#formMailConfirmation').value = "";
                        localStorage.setItem("cart", JSON.stringify([]));
                    });

            } else {
                Swal.fire({
                    icon: "warning",
                    title: `Atención`,
                    text: "Ambos correos deben coincidir",
                }).then(() => {
                    mailInput = "";
                    mailConfirmationInput = "";
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: `Atención`,
                text: "Por favor llena todos los campos del formulario para continuar",
            })
        }
    }

    return (
        <main className="container-xl py-5">
            <h2 className="text-center text-white my-5 py-3 bg-secondary cart-title">
                Artículos en <span className="text-third">Carrito</span>
            </h2>

            <div className="container-xl mt-5 cart-container">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Imagen</th>
                                <th className="text-center">Articulo</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Monto Total</th>
                                <th className="text-center">Quitar Artículo</th>
                            </tr>
                        </thead>
                        <tbody className="tbody-cart">
                            {cart && cart.length > 0 ? (
                                cart.map((product) => (
                                    <tr key={product.id}>
                                        <td className="text-center">
                                            <img
                                                className="aspect-ratio-item cart-table-image"
                                                src={`/src/assets/img/products/${product.imagen}`}
                                                alt={product.nombre}
                                            />
                                        </td>
                                        <td className="text-center">{product.nombre}</td>
                                        <td className="text-center">${product.precio}.00</td>
                                        <td className="text-center">{product.cantidad}</td>
                                        <td className="text-center">${product.precio * product.cantidad}.00</td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => removeFromCart(product)}>Quitar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay productos en el carrito.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="container-xl checkout-container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12 col-md-6 text-start">
                            <p className="h1 fw-bold text-center mb-4">Resumen de Compra</p>
                            <p className="fw-bold">
                                Cantidad de productos:{" "}
                                <span className="fw-normal">{numberOfItemsInCart}</span>
                            </p>
                            <p className="fw-bold">
                                Total bruto: {" "}
                                <span className="fw-normal">${grossTotal}.00</span>
                            </p>
                            <p className="fw-bold">
                                IVA: {" "}
                                <span className="fw-normal">${iva}.00</span>
                            </p>
                            <p className="fw-bold">
                                Total a pagar:{" "}
                                <span className="fw-normal">${cartTotal}.00</span>
                            </p>
                        </div>
                    </div>
                    <hr className="w-50 d-block mx-auto" />
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className="col-4">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formName"
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <label className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formLastname"
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="formPhone"
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="formMail"
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Confirmar Correo</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="formMailConfirmation"
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center my-4">
                        <div className="col-3">
                            <button className="btn btn-third fs-3 fw-bold py-3 text-uppercase d-block mx-auto" onClick={handleSubmit}>
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
