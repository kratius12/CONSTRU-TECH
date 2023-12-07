import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetalleCompra = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState({});
  const [detalleCompras, setDetalleCompras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCompra = await axios.get(`http://localhost:4000/compra/${id}`);
        setCompra(responseCompra.data);

        const responseDetalle = await axios.get(`http://localhost:4000/detalle/${id}`);
        setDetalleCompras(responseDetalle.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Detalles de la Compra</h2>

      <div>
        <strong>ID de Compra:</strong> {compra.idCom}
      </div>
      <div>
        <strong>Fecha:</strong> {compra.fecha}
      </div>
      <div>
        <strong>Imagen:</strong> <img src={`http://localhost:4000/images/${compra.imagen}`} alt="Factura" />
      </div>
      <div>
        <strong>Total de Compra:</strong> {compra.total_compra}
      </div>

      <h3>Detalle de Compras</h3>
      <table>
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>Material</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalleCompras.map((detalle) => (
            <tr key={detalle.id}>
              <td>{detalle.id}</td>
              <td>{detalle.materiales.nombre}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.precio}</td>
              <td>{detalle.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleCompra;
