import * as Yup from 'yup';

const permisoSchema = Yup.object().shape({
    permiso: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido'),
    estado: Yup.string()
        .required('El estado es requerido')
});

export default permisoSchema