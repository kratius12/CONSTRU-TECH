import * as Yup from 'yup';

const EmpleadoSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellidos: Yup.string().required('Los apellidos son obligatorios'),
  email: Yup.string().email('Ingresa un correo electrónico válido').required('El email es obligatorio'),
  contrasena: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tipoDoc: Yup.string().required('Seleccione tipo documento'),
  cedula: Yup.string().required('El número de documento es obligatorio'),
  telefono: Yup.string().required('El número telefónico es obligatorio'),
  direccion: Yup.string().required('La dirección es obligatoria'),
  estado: Yup.string().required('Seleccione estado'),
  // especialidad: Yup.array().min(1, 'Seleccione al menos una especialidad'),
});

export default EmpleadoSchema;
