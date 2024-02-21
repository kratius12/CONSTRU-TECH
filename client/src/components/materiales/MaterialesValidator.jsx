import * as Yup from 'yup';
const materialSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  idCategoria: Yup.string()
    .required('La categoria es requerida'),
  cantidad: Yup.number().positive("La cantidad debe ser un número positivo.")
  // estado: Yup.string()
  //   .required('El estado es requerido')
});

export default materialSchema