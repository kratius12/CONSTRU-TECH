import * as Yup from "yup";

const ClientSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números'),
    apellidos: Yup.string()
        .min(3, 'El apellido debe contener al menos 3 caracteres')
        .max(50, 'El apellido no puede contener mas de 50 caracteres')
        .required('El apellido es requerido')
        .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números'),
    email: Yup.string().email('Formato de correo electrónico invalido').required('Correo electrónico requerido'),
    direccion: Yup.string()
        .min(5, 'La dirección debe contener al menos 5 caracteres')
        .max(50, 'La dirección no puede contener mas de 50 caracteres')
        .required('La dirección es requerida'),
    telefono: Yup.string()
        .min(7, 'El número telefónico debe tener al menos 7 caracteres')
        .max(12, 'El número telefónico no puede tener mas de 12 caracteres')
        .required('El número telefónico es requerido')
        .matches(/^[0-9]+$/, 'El número de documento de identidad solo puede contener numeros'),
    tipoDoc: Yup.string()
        .required('El tipo de documento es requerido'),
    cedula: Yup.string()
        .min(8, 'El documento debe contener al menos 8 caracteres')
        .max(20, 'El documento no puede contener mas de 20 caracteres')
        .required('El número de documento es requerido').matches(/^[0-9]+$/, 'El número de documento de identidad solo puede contener numeros'),
    fecha_nac: Yup.string()
        .required('La fecha de nacimiento es requerida'),
    estado: Yup.string()
        .required('El estado es requerido'),
    contrasena: Yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres').trim().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
    ),
});
export default ClientSchema