import * as yup from 'yup';

const RolSchema = yup.object().shape({
  nombre: yup
    .string()
    .trim() // Elimina espacios en blanco al principio y al final
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
    .required('El nombre del rol es obligatorio'),
  permisos: yup.array().min(1, 'Debe seleccionar al menos un permiso'),
});


export default RolSchema