
import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useLogin } from '../../context/login/LoginProvider';
const LoginPage = () => {

  const [usuario, setUsuario] = useState({
    correo: "",
    contrasena: "",
  })

  return (
    <>
        <>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Constru-tech</title>
            {/* Custom fonts for this template*/}
            <link
                href="src/assets/vendor/fontawesome-free/css/all.min.css"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"
            />
            {/* Custom styles for this template*/}
            <link href="src/assets/css/template/sb-admin-2.css" rel="stylesheet" />
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Iniciar Sesion</h1>
                                            </div>
                                            <Formik initialValues={usuario}
                                                enableReinitialize={true}
                                                onSubmit={async (values) => {
                                                    await login(values)
                                                    alertConfirm()
                                                    setUsuario({
                                                        correo: "",
                                                        contrasena: ""
                                                    })
                                                }}>
                                                {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                                                    <Form className="user" onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="correo"></label>
                                                            <input
                                                                type="email"
                                                                className="form-control form-control-user"
                                                                id="correo"
                                                                onChange={handleChange}
                                                                value={values.correo}
                                                                aria-describedby="emailHelp"
                                                                placeholder="Ingrese el correo electrónico"
                                                            />
                                                            {errors.correo && touched.correo ?(
                                                                <div className="alert alert-danger" role="alert">
                                                                    {errors.correo}
                                                                </div>
                                                            ):null}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="contrasena"></label>
                                                            <input
                                                                type="password"
                                                                className="form-control form-control-user"
                                                                onChange={handleChange}
                                                                value={values.contrasena}
                                                                id="contrasena"
                                                                placeholder="Ingrese la contraseña"
                                                            />
                                                            {errors.contrasena && touched.contrasena ?(
                                                                <div className="alert alert-danger" role="alert">
                                                                    {errors.contrasena}
                                                                </div>
                                                            ):null}
                                                        </div>
                                                        {/* <a
                                                            href="/"
                                                            className="btn btn-primary btn-user btn-block"
                                                        >
                                                            Entrar
                                                        </a> */}
                                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-user btn-block">
                                                            Entrar
                                                            </button>                                                        
                                                        <hr />
                                                    </Form>
                                                )}
                                            </Formik>
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
        </>    
    </>
  );
};

export default LoginPage;
