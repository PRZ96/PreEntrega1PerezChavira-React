import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"

const Navbar = ({productCategories}) => {
  return (
    <>
        <header className="py-4 d-none d-lg-block">
        <Link className="text-decoration-none" to={'/'}>
            <h1 className="text-center text-uppercase">PRZ <span className="text-third text-uppercase">Art Gallery</span></h1>
        </Link>
        </header>

        <div className="border-top py-1">
            <div className="navbar navbar-expand-lg navbar-light container">
            <Link className="text-decoration-none" to={'/'}>
            <h1 className="navbar-brand d-lg-none fw-bold text-uppercase text-secondary fs-1">PRZ <span className="text-third">ART GALLERY</span></h1>
            </Link>
                <div className="d-flex align-items-center">
                <div className="pe-4 d-lg-none">
                    <CartWidget />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                </div>
                <div id="navigation" className="collapse navbar-collapse">
                    <nav className="navbar-nav container text-center d-flex flex-md-row justify-content-md-between align-items-center">
                    <Link className="text-decoration-none" to={'/'}>
                        <p className="text-dark fw-bold">Inicio</p>
                    </Link>
                    {productCategories.map((category) => {
                        return (
                            <Link className="text-decoration-none" key={category.id} to={`/category/${category.id}`}>
                                <p className="text-dark fw-bold">{category.nombre}</p>
                            </Link>
                        )
                    })}
                    <Link className="text-decoration-none" to={'/'}>
                        <CartWidget />
                    </Link>
                    </nav>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar