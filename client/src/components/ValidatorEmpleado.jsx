import * as Yup from 'yup';

const EmpleadoSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim(),
  apellidos: Yup.string().required('Los apellidos son obligatorios').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim(),
  email: Yup.string().email('Ingresa un correo electrónico válido').required('El email es obligatorio').trim(),
  contrasena: Yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 6 caracteres').trim().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
  ),
  tipoDoc: Yup.string().required('Seleccione tipo documento').trim(),
  cedula: Yup.string().required('El número de documento es obligatorio').matches(/^[0-9]+$/, 'El número de documento de identidad solo puede contener numeros').max(10, "La cedula no puede contener más de 10 caracteres").min(8, "El número de documento de identidad no puede contener menos de 8 caracteres").trim(),
  telefono: Yup.string().required('El número telefónico es obligatorio').matches(/^[0-9]+$/, 'El número de telefono de identidad solo puede contener numeros').max(10, "El número de telefono no puede contener más de 10 caracteres").trim().min(7, "El numero de telefono no debe de tener menos de 7 caracteres"),
  direccion: Yup.string().required('La dirección es obligatoria').trim(),
  estado: Yup.string().required('Seleccione estado').trim(),
  especialidad: Yup.array().min(1, "Debe seleccionar al menos una especialidad"),
  rol: Yup.object().required("Debe seleccionar un rol")
});

export default EmpleadoSchema;
