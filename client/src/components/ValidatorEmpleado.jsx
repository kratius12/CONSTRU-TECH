import * as Yup from 'yup';

const EmpleadoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  tipoDoc: Yup.string()
    .required('Tipo de documento es requerido'),
  email: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
  cedula: Yup.string()
  .min(8, 'La cedula debe contener al menos 8 caracteres')
  .max(20, 'La cedula no puede contener mas de 20 caracteres')
  .required('La cedula es requerida'),
  telefono: Yup.string()
  .min(7, 'El telefono debe contener al menos 7 caracteres')
  .max(12, 'El telefono no puede contener mas de 12 caracteres')
  .required('El telefono es requerido'),
  direccion: Yup.string()
  .min(5, 'La direccion debe contener al menos 5 caracteres')
  .max(50, 'La direccion no puede contener mas de 50 caracteres')
  .required('La direccion es requerida'),
  estado: Yup.string()
  .required('El estado es requerido')
});

export default EmpleadoSchema