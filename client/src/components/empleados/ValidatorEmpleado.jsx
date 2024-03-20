import * as Yup from 'yup';

export const EmpleadoSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(15, "El nombre debe contener como maximo 15 caracteres"),
  apellidos: Yup.string().required('Los apellidos son obligatorios').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(15, "El apellido debe contener como maximo 15 caracteres"),
  email: Yup.string().email('Ingresa un correo electrónico válido').required('El email es obligatorio').trim(),
  contrasena: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').trim().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
  ).required("La contraseña es requerida"),
  tipoDoc: Yup.string().required('Seleccione tipo documento').trim(),
  cedula: Yup.string().required('El número de documento es obligatorio').matches(/^[0-9]+$/, 'El número de documento de identidad solo puede contener numeros').max(10, "La cedula no puede contener más de 10 caracteres").min(8, "El número de documento de identidad no puede contener menos de 8 caracteres").trim().test('no-inicia-con-cero', 'El documento no puede empezar con cero', value => !value.startsWith('0')),
  telefono: Yup.string().required('El número telefónico es obligatorio').matches(/^[0-9]+$/, 'El número de telefono de identidad solo puede contener numeros').max(10, "El número de telefono no puede contener más de 10 caracteres").trim().min(7, "El numero de telefono no debe de tener menos de 7 caracteres").test('no-inicia-con-cero', 'El telefono no puede empezar con cero', value => !value.startsWith('0')),
  direccion: Yup.string().required('La dirección es obligatoria').trim().min(10,"La dirección debe contener al menos 10 caracteres").max(50,"La dirección debe contener maximo 50 caracteres"),
  especialidad: Yup.array().min(1, "Debe seleccionar al menos una especialidad"),
  rol: Yup.string().required("El rol es requerido"),
  confirmar: Yup.string()
    .oneOf([Yup.ref('contrasena'), null], 'Las contraseñas deben coincidir').
    required("Debe confirmar la contraseña")
});

export const EmpleadosSchemaEdit = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(15, "El nombre debe contener como maximo 15 caracteres")
  ,
  apellidos: Yup.string().required('Los apellidos son obligatorios').matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números').trim()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(15, "El apellido debe contener como maximo 15 caracteres"),
  email: Yup.string().email('Ingresa un correo electrónico válido').required('El email es obligatorio').trim(),
  contrasena: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').trim().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
  ),
  tipoDoc: Yup.string().required('Seleccione tipo documento').trim(),
  cedula: Yup.string().required('El número de documento es obligatorio').matches(/^[0-9]+$/, 'El número de documento de identidad solo puede contener numeros').max(10, "La cedula no puede contener más de 10 caracteres").min(8, "El número de documento de identidad no puede contener menos de 8 caracteres").trim().test('no-inicia-con-cero', 'El documento no puede empezar con cero', value => !value.startsWith('0')),
  telefono: Yup.string().required('El número telefónico es obligatorio').matches(/^[0-9]+$/, 'El número de telefono de identidad solo puede contener numeros').max(10, "El número de telefono no puede contener más de 10 caracteres").trim().min(7, "El numero de telefono no debe de tener menos de 7 caracteres").test('no-inicia-con-cero', 'El telefono no puede empezar con cero', value => !value.startsWith('0')),
  direccion: Yup.string().required('La dirección es obligatoria').trim().min(10,"La dirección debe contener al menos 10 caracteres").max(50,"La dirección debe contener maximo 50 caracteres"),
  especialidad: Yup.array().min(1, "Debe seleccionar al menos una especialidad"),
  rol: Yup.string().required("El rol es requerido"),
  confirmar: Yup.string()
    .oneOf([Yup.ref('contrasena'), null], 'Las contraseñas deben coincidir')
})
