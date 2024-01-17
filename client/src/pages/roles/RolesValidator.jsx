import * as Yup from 'yup';

const RolSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
        .trim(),
    // estado: Yup.string()
    //     .required('El estado es requerido'),
    permisos: Yup.array()
        .min(1, 'Debes seleccionar al menos un permiso.'),
});

export default RolSchema