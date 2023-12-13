import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import "../../components/compras/comprasDetalle.css"; 

const CompraDetalle = () => {
    const { id } = useParams();
    const [compra, setCompra] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompraDetalle = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/compra/${id}`);
                setCompra(response.data);
            } catch (error) {
                console.error("Error fetching compra detalle:", error);
            }
        };

        fetchCompraDetalle();
    }, [id]);

    if (!compra) {
        return <div>Cargando...</div>;
    }
   
    return (
        <div>

            <div className="card text-center w-100">
                <h2>Detalle de Compra</h2>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2 mt-3 mx-auto">
                            <label htmlFor="fecha">ID compra:</label>
                            <input className="form-control form-control-user" type="text" id="fecha" name="fecha" value={compra.idCom} disabled/>
                        </div>
                        <div className="col-md-3 mt-3 mx-auto">
                        <label htmlFor="fecha">Fecha de compra:</label>
                            <input className="form-control form-control-user" type="text" id="fecha" name="fecha" value={compra.fecha} disabled/>
                        </div>
                        <div className="col-md-3 mt-3 mx-auto">
                        <label htmlFor="fecha">Codigo de factura:</label>
                            <input className="form-control form-control-user" type="text" id="fecha" name="fecha" value={compra.codigoFactura} disabled/>
                        </div>
                        <div className="col-md-3 mt-3 mx-auto">
                        <label htmlFor="fecha">Total de la compra:</label>
                            <input className="form-control form-control-user" type="text" id="fecha" name="fecha" value={(compra.total_compra)} disabled/>
                        </div>
                    </div>
                </div>
                <div>
                    <strong>Imagen de la factura:</strong><br />
                    <img src={`${compra.imagen}`} alt={compra.codigoFactura} />
                </div>
                <hr />
                <h3>Materiales:</h3>
                <div className="detalle-container">
                    {compra.compras_detalle.map((detalle) => (
                        <><div key={detalle.id}>
                            <Card className="detalle-card">
                                <div><strong>Material: </strong> {detalle.materiales.nombre}</div>
                                <div><strong>Categoria:</strong> {detalle.categoria.nombre}</div>
                                <div><strong>Cantidad:</strong> {detalle.cantidad}</div>
                                <div><strong>Precio:</strong> {detalle.precio}</div>
                                <div><strong>Subtotal:</strong> {detalle.subtotal}</div>
                            </Card>
                        </div></>
                    ))}
                </div>
                <div className="card-footer text-center mt-3">
                    <div className="row">
                        <a type="button" href="" className="btn btn-danger btn-icon-split mx-auto w-50" onClick={() => navigate(`/compras`)}>

                            <span className="text">Regresar</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompraDetalle;
