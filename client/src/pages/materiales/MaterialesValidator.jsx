import * as Yup from 'yup';
const materialSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  idCategoria: Yup.string()
    .required('La categoria es requerida'),
  // estado: Yup.string()
  //   .required('El estado es requerido')
});

export default materialSchema