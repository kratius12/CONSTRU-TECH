import * as Yup from 'yup';

const comprasSchema = Yup.object().shape({
  fecha: Yup.date().required("Fecha es requerida").max(new Date(), 'La fecha no puede ser posterior a la fecha actual').min(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'La fecha no puede ser anterior a una semana'),
  imagen: Yup.mixed().required("Factura es requerida"),
  idProv: Yup.string().required("Proveedor es requerido").trim(),
  codigoFactura: Yup.string().required("Código de Factura es requerido").trim(),
  detalles: Yup.array().of(
    Yup.object().shape({
      idCat: Yup.string().required("Categoría es requerida").trim(),
      idMat: Yup.string().required("Material es requerido").trim(),
      cantidad: Yup.number("La cantidad solo puede contener números").required("Cantidad es requerida").positive("La cantidad tiene que ser un numero positivo"),
      precio: Yup.number("El precio solo puede contener números").required("Precio es requerido").positive("EL precio tiene que ser un numero positivo"),
    })
  ).min(1, "Debe de ingresar al menos un material"),
});

export default comprasSchema;
