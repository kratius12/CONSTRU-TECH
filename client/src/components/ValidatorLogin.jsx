import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    correo: Yup.string().email('Formato de correo electrónico invalido').required('Correo electrónico requerido'),
    contrasena: Yup.string().required('Contraseña requerida')
})  
export default LoginSchema 