import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProveedorTable({ proveedores }) {
  // const proveedoresData = proveedores
  // const navigate = useNavigate()
  // const [estadoProv, setStatus] = useState()
  // const handleClick = (idProv, estado) => {
  //   const newStatus = estado === 1 ? 0 : 1
  //   console.log(idProv + "-" + estado + "-" + newStatus)
  //   setStatus(newStatus)
  // }
  // const [switchActivado,setswitchActivado] = useState(false);
  // const [valor,setValor] = useState(0)

  // const manejarSwitch = ()=>{
  //     setswitchActivado(!switchActivado);

  //     setValor(switchActivado ? 0 : 1);
  // }
  // // const toggleStatus = (idProv, status) => {
  // //   const newStatus = status === 1 ? 0 : 1
  // //   setStatus(newStatus)
  // // }
  // return (
  //   <div>
  //     <table id="table" className="table table-striped table-sm">
  //       <thead>
  //         <tr>
  //           <th scope="col">#</th>
  //           <th scope="col">Nombre</th>
  //           <th scope="col">Telefono</th>
  //           <th scope="col">Email</th>
  //           <th scope="col">Nombre contacto</th>
  //           <th scope="col">Telefono contacto</th>
  //           <th scope="col">Estado</th>
  //           <th scope="col">Ver detalle</th>
  //           <th scope="col">Acción</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {proveedoresData.map(({ idProv, nombre, telefono, email, estado, nombreContacto, telefonoContacto }) => {
  //           return (
  //             <tr key={idProv}>
  //               <td>{idProv}</td>
  //               <td>{nombre}</td>
  //               <td>{telefono}</td>
  //               <td>{email}</td>
  //               <td>{nombreContacto}</td>
  //               <td>{telefonoContacto}</td>
  //               <td>
  //                 <div className="form-check form-switch">
  //                   <label className='switch'>
  //                     <input type="checkbox"
  //                       checked={switchActivado}
  //                       onChange={manejarSwitch}
  //                     />
  //                     <span className='slider rounded' />
  //                   </label>
  //                   <p>{valor}</p>
  //                 </div>
  //               </td>
  //               <td>
  //                 <a
  //                   className="btn bg-secondary text-white"
  //                   onClick={() => navigate(`/verProveedor/${idProv}`)}
  //                 >
  //                   {" "}
  //                   Ver <span data-feather="edit-3" />{" "}
  //                 </a>
  //               </td>
  //               <td>
  //                 <a
  //                   className="btn bg-secondary text-white"
  //                   onClick={() => navigate(`/editarProveedor/${idProv}`)}
  //                 >
  //                   {" "}
  //                   Editar <span data-feather="edit-3" />{" "}
  //                 </a>
  //               </td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}