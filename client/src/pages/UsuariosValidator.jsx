import * as Yup from 'yup';


const UsuarioSchema = Yup.object().shape({
    correo: Yup.string().email('Formato de correo electrónico invalido').required('Correo electrónico requerido'),
    estado: Yup.string().required("El estado es requerido"),
    contrasena: Yup.string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .max(50, 'La contraseña no puede tener mas de 50 caracteres')
    // .matches(/[0-9]/, getCharacterValidationError("digit"))
    // .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .required('La contraseña es requerida'),
    // idRol: Yup.string().required("El rol es requerido"),
    // idEmp: Yup.string().required("El empleado es requerido")
})


export default UsuarioSchema