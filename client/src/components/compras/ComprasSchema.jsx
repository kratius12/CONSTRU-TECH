import * as Yup from 'yup';

const comprasSchema = Yup.object().shape({
  fecha: Yup.date()
    .required("Fecha es requerida")
    .max(new Date(), 'La fecha no puede ser posterior a la fecha actual')
    .min(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'La fecha no puede ser anterior a una semana'),

  imagen: Yup.mixed()
    .required("Factura es requerida")
    .test('es-imagen', 'Solo se permiten archivos de imagen o pdf', (value) => {
      if (!value) {
        return false; // Archivo no proporcionado
      }
      const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', "image/jpg", 'application/pdf']; // Puedes ampliar esta lista según tus necesidades
      // Verificar el tipo de archivo
      return allowedFormats.includes(value.type);
    }),

  idProv: Yup.string().required("Proveedor es requerido").trim(),
  codigoFactura: Yup.string().required("Código de Factura es requerido").matches(/^\S+$/, 'No se permiten espacios en blanco'),

  detalles: Yup.array().of(
    Yup.object().shape({
      idMat: Yup.string().required("Material es requerido").trim(),
      cantidad: Yup.string()
        .required("Cantidad es requerida")
        .matches(/^\S+$/, 'No se permiten espacios en blanco').matches(/^[0-9]+$/, 'La cantidad solo puede contener números'),
      precio: Yup.string()
        .required("Precio es requerido")
        .matches(/^\S+$/, 'No se permiten espacios en blanco').matches(/^[0-9]+$/, 'El precio solo puede contener números'),
    })
  ).min(1, "Debe de ingresar al menos un material"),
});

export default comprasSchema;
