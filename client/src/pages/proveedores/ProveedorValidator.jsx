import * as Yup from 'yup';

export const proveedorSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido'),
    email: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
    telefono: Yup.string()
        .min(7, 'El telefono debe contener al menos 7 caracteres')
        .max(12, 'El telefono no puede contener mas de 12 caracteres')
        .required('El telefono es requerido')
        .trim()
    ,
    direccion: Yup.string()
        .min(5, 'La direccion debe contener al menos 5 caracteres')
        .max(50, 'La direccion no puede contener mas de 50 caracteres')
        .required('La direccion es requerida'),
    estado: Yup.string()
        .required('El estado es requerido'),
    nit: Yup.string()
        .min(9, 'El nit debe contener 9 digitos')
        .max(14, 'El nit debe tener como maximo 14 digitos')
        .required('El nit es requerido')
        .trim('El telefono no permite espacios')
    ,
    nombreContacto: Yup.string()
        .min(3, 'El nombre del contacto debe contener al menos 3 caracteres')
        .max(50, 'El nombre del contacto no puede contener mas de 50 caracteres'),
    telefonoContacto: Yup.string()
        .min(7, 'El telefono del contacto debe contener al menos 7 caracteres')
        .max(12, 'El telefono del contacto no puede contener mas de 12 caracteres')
        .trim('El telefono no permite espacios'),
    emailContacto: Yup.string().email('Formato de correo electronico invalido'),
    tipo:Yup.string()
        .required('el tipo de proveedor es requerido')
});

export default proveedorSchema
