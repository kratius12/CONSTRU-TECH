import * as Yup from 'yup';

const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
    .required('El nombre es requerido').trim(),
  medida: Yup.string()
    .required('La unidad de medida es requerida'),
  // estado: Yup.string()
  //   .required('El estado es requerido')
});

export default CategoriaSchema
