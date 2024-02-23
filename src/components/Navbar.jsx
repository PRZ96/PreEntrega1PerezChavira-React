import CartWidget from "./CartWidget"

const Navbar = () => {
  return (
    <>
        <header className="py-4 d-none d-lg-block">
            <h1 className="text-center text-uppercase">PRZ <span className="text-third text-uppercase">Art Gallery</span></h1>
        </header>

        <div className="border-top py-1">
            <div className="navbar navbar-expand-lg navbar-light container">
                <a className="navbar-brand d-lg-none fw-bold text-uppercase text-secondary fs-1" href="index.html">PRZ <span className="text-third">ART GALLERY</span></a>
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
                        <a className="text-dark text-decoration-none fw-bold" href="index.html">Inicio</a>
                        <a className="text-dark text-decoration-none fw-bold" href="#">Productos</a>
                        <a className="text-dark text-decoration-none fw-bold d-none d-lg-block" href="#"><CartWidget /></a>
                    </nav>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar