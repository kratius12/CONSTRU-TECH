import * as Yup from 'yup';
const comprasSchema = Yup.object().shape({
    fecha:Yup.date()
        .required('La fecha es requerida'),
    imagen: Yup.string()
        .required('La imagen de la factura es requerida'),
    categoria:Yup.string()
        .required('La categoria es requerida'),
    material:Yup.string()
        .required('El material es requerido'),
    precio:Yup.number()
        .required('El precio es requerido')
        .positive('El precio no puede contener valores negativos')
        .integer(),
    cantidad:Yup.number()
        .required('La cantidad es requerida')
        .positive('La cantidad no puede contener valores negativos')
});

export default comprasSchema