import * as Yup from 'yup';

const comprasSchema = Yup.object().shape({
  fecha: Yup.date().required("Fecha es requerida"),
  imagen: Yup.mixed().required("Factura es requerida"),
  idProv: Yup.string().required("Proveedor es requerido"),
  codigoFactura: Yup.string().required("Código de Factura es requerido"),
  detalles: Yup.array().of(
    Yup.object().shape({
      idCat: Yup.string().required("Categoría es requerida"),
      idMat: Yup.string().required("Material es requerido"),
      cantidad: Yup.number().required("Cantidad es requerida").positive("La cantidad tiene que ser un numero positivo"),
      precio: Yup.number().required("Precio es requerido"),
    })
  ).min(1, "Debe de ingresar al menos un material"),
});

export default comprasSchema;
