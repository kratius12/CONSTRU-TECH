import * as Yup from 'yup';
const materialSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  idProveedor: Yup.string()
    .required('El proveedor es requerido'),
  idCategoria: Yup.string()
    .required('La categoria es requerida'),
  estado: Yup.string()
    .required('El estado es requerido')
});

export default materialSchema