import * as yup from 'yup';

const RolSchema = yup.object().shape({
  nombre: yup
    .string()
    .min(3,"El nombre del rol debe contener al menos 3 caracteres")
    .max(25,"El nombre del rol debe contener maximo 25 caracteres")
    .trim()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
    .required('El nombre del rol es obligatorio'),
  permisos: yup.array().min(1, 'Debe seleccionar al menos un permiso'),
});


export default RolSchema