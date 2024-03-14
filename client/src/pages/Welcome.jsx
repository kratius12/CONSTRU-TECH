import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Welcome({userData}) {
    const location = useLocation();
    const { state } = location;
    const { redirected, from } = state || {};

    const alertRoutes = (route) => {
        $.confirm({
            title: `Su usuario no tiene permiso para ingresar a ${route}`,
            content: "Redirecionando a inicio...",
            icon: "fa fa-x-mark",
            theme: "modern",
            closeIcon: true,
            animation: "zoom",
            closeAnimation: "scale",
            animationSpeed: 500,
            type: "red",
            columnClass: "col-md-6 col-md-offset-3",
            autoClose: "cerrar|2000",
            buttons: {
                cerrar: function () { },
            },
        });
    }
    if (redirected && from) {
        alertRoutes(from)
    }
    return (
        <div className="container text-center">
            <h1>Bienvenido {userData}</h1>
        </div>
    )
}

export default Welcome