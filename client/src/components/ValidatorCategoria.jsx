import * as Yup from 'yup';

const CategoriaSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre debe contener al menos 3 caracteres')
      .max(50, 'El nombre no puede contener mas de 50 caracteres')
      .required('El nombre es requerido').trim(),
    medida: Yup.string()
      .required('La medida es requerido'),    
    estado: Yup.string()
    .required('El estado es requerido')
  });

export default CategoriaSchema
