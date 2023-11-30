import { useRef, useState, useEffect } from "react"

function LoginPage() {
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    function handleSubmit(event) {
        event.preventDefault()
    }
    return (
        <>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>SB Admin 2 - Login</title>
            {/* Custom fonts for this template*/}
            <link
                href="vendor/fontawesome-free/css/all.min.css"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"
            />
            {/* Custom styles for this template*/}
            <link href="css/sb-admin-2.min.css" rel="stylesheet" />
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"/> */}
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Bienvenido</h1>
                                            </div>
                                                <form className="user" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="correo"></label>
                                                        <input
                                                            onChange={e => setCorreo(e.target.value)}
                                                            type="email"
                                                            className="form-control form-control-user"
                                                            id="correo"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Ingrese el correo electrónico"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="contrasena"></label>
                                                        <input
                                                        onChange={e => setContrasena(e.target.value)}
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="contrasena"
                                                            placeholder="Ingrese la contraseña"
                                                        />
                                                    </div>
                                                    <a
                                                        href="/"
                                                        className="btn btn-primary btn-user btn-block"
                                                    >
                                                        Entrar
                                                    </a>
                                                    <hr />
                                                </form>
                                            <div className="text-center">
                                                <a className="small" href="#">
                                                    ¿Olvidó su contraseña?
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap core JavaScript*/}
            {/* Core plugin JavaScript*/}
            {/* Custom scripts for all pages*/}
        </>
    )
}
export default LoginPage