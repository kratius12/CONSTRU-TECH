import * as Yup from 'yup';

const EspecialidadSchema = Yup.object().shape({
  especialidad: Yup.string()
    .min(3, 'La especialidad debe contener al menos 3 caracteres')
    .max(50, 'La especialidad no puede contener mas de 50 caracteres')
    .required('La especialidad es requerido')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
});

export default EspecialidadSchema