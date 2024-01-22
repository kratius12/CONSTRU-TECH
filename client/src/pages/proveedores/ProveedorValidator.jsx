import * as Yup from 'yup';
export const proveedorSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre o razón social debe contener al menos 3 caracteres')
        .max(50, 'El nombre o razón social no puede contener mas de 50 caracteres')
        .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
        .trim()
        .required('El nombre es requerido')
        ,
    email: Yup.string().email('Formato de correo electronico invalido')
        .trim()
        .required('Correo electronico requerido'),
    telefono: Yup.string()
        .min(7, 'El telefono debe contener al menos 7 caracteres')
        .max(12, 'El telefono no puede contener mas de 12 caracteres')
        .required('El telefono es requerido')
        .matches(/^[0-9]+$/, 'El teléfono solo puede contener números')
        .trim()
    ,
    direccion: Yup.string()
        .min(5, 'La direccion debe contener al menos 5 caracteres')
        .max(50, 'La direccion no puede contener mas de 50 caracteres')
        .trim()
        .required('La direccion es requerida'),
    nit: Yup.string()
        .min(9, 'El nit o el número de identificación debe contener 9 digitos')
        .max(14, 'El nit o el número de identificación debe tener como maximo 14 digitos')
        .required('El nit es requerido')
        .matches(/^[0-9-]+$/, 'Solo se permiten números y algunos caracteres especiales')
        .trim()
        ,
    tipo: Yup.string().required("Seleccione el tipo de proveedor"),
});

export default proveedorSchema
