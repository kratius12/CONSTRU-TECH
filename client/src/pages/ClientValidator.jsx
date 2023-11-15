import * as Yup from "yup";

const ClientSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
    apellidos: Yup.string()
    .min(3, 'El apellido debe contener al menos 3 caracteres')
    .max(50, 'El apellido no puede contener mas de 50 caracteres')
    .required('El apellido es requerido'),
    email: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
    direccion: Yup.string()
    .min(5, 'La direccion debe contener al menos 5 caracteres')
    .max(50, 'La direccion no puede contener mas de 50 caracteres')
    .required('La direccion es requerida'),
    telefono: Yup.string()
    .min(7, 'El numero telefonico debe tener al menos 7 caracteres')
    .max(12, 'El numero telefonico no puede tener mas de 12 caracteres')
    .required('El numero telefonico es requerido'),
    tipoDoc: Yup.string()
    .required('El tipo de documento es requerido'),
    cedula: Yup.string()
    .min(8, 'La cedula debe contener al menos 8 caracteres')
    .max(20, 'La cedula no puede contener mas de 20 caracteres')
    .required('La cedula es requerida'),
    fecha_nac: Yup.string()
    .required('La fecha de nacimiento es requerida'),
    estado: Yup.string()
    .required('El estado es requerido'),
    contrasena: Yup.string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .max(50, 'La contraseña no puede tener mas de 50 caracteres')
    .required('La contraseña es requerida')
});
export default ClientSchema