const validateForm = (values) => {
  const errors = {};

  if (!values.tipo) {
    errors.tipo = 'Seleccione el tipo de proveedor*';
  }

  if (!values.nit || values.nit.trim() === '') {
    if (values.tipo == "Juridico") {
      errors.nit = "El NIT es requerido";
    } else if (values.tipo == "Natural") {
      errors.nit = "El número de identificación es requerido";
    } else {
      errors.nit = "Este campo es requerido";
    }
  } else if (values.tipo === 'Juridico') {
    // Validar longitud y presencia del guion (-)
    if (values.nit.trim().length !== 11) {
      errors.nit = 'Para proveedores jurídicos, el NIT debe tener 11 caracteres';
    } else if (!/\-\d$/.test(values.nit.trim())) {
      errors.nit = "El NIT debe contener un guion (-) antes del último número";
    } else if (values.nit.trim()[0] == '0') {
      errors.nit = 'El NIT no debe comenzar con 0';
    }
  } else if (values.tipo.trim() === 'Natural') {
    if (values.nit.trim().length < 6) {
      errors.nit = "El número de identificación debe no debe contener menos de 6 dígitos";
    } else if (values.nit.trim().length > 10) {
      errors.nit = "El número de identificación no debe contener más de 10 dígitos";
    }else if (values.nit.trim()[0] == '0') {
      errors.nit = "El número de identificación no debe comenzar con 0";
    }
  }

  if (!values.nombre || values.nombre.trim() === '') {
    if (values.tipo == "Juridico") {
      errors.nombre = "La razón social es requerida";
    } else if (values.tipo == "Natural") {
      errors.nombre = "El nombre es requerido";
    } else {
      errors.nombre = "Este campo es requerido";
    }
  } else if (values.nombre.trim().length > 20) {
    errors.nombre = 'El nombre debe tener máximo 20 caracteres';
  } else if (values.nombre.trim().length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  }else if (!/^[a-zA-Z\s]+$/.test(values.nombre.trim())) {
    errors.nombre = "El nombre solo puede contener letras y espacios";
  }

  if (!values.email || !/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
    errors.email = 'Ingrese una dirección de correo electrónico válida';
  } else if (values.email.trim().length > 100) {
    errors.email = 'El correo electronico debe tener maximo 100 caracteres';
  }

  if (!values.direccion || values.direccion.trim() === '') {
    errors.direccion = 'Este campo es obligatorio';
  } else if (values.direccion.trim().length > 50) {
    errors.direccion = 'La dirección debe contener maximo 50 caracteres';
  }else if (values.direccion.trim().length < 10){
    errors.direccion = "La dirección debe contener minimo 10 caracteres"
  }

  const isValidPhoneNumber = (value) => {
    return /^[0-9]+$/.test(value);
  };

  if (!values.telefono || values.telefono.trim() === '') {
    errors.telefono = 'El telefono es requerido';
  } else if (values.telefono.trim()[0]==0) {
    errors.telefono = 'El número de telefono no puede iniciar con 0';
  } else if (values.telefono.trim().length > 10) {
    errors.telefono = 'El número de telefono debe tener como maximo 10 caracteres';
  }else if (!isValidPhoneNumber(values.telefono.trim())){
    errors.telefono = "El número de telefono solo puede contener numeros"
  }else if (values.telefono.trim().length < 7){
    errors.telefono = "El número de telefono no puede tener menos de 7 caracteres"
  }

  if (values.tipo === 'Juridico') {
    if (!values.nombreContacto || values.nombreContacto.trim() === '') {
      errors.nombreContacto = 'El nombre del contacto es obligatorio';
    } else if (values.nombreContacto.trim().length > 25) {
      errors.nombreContacto = 'El nombre del contacto debe contener 25 caracteres';
    } else if (values.nombreContacto.trim().length <3){
      errors.nombreContacto = "El nombre de contacto debe tener al menos 3 caracteres"
    }else if(!/^[a-zA-Z\s]+$/.test(values.nombreContacto.trim())){
      errors.nombreContacto = "El nombre de contacto solo puede contener letras y espacios"
    }

    if (!values.telefonoContacto || values.telefonoContacto.trim() === '') {
      errors.telefonoContacto = 'El telefono de contacto es requerido';
    } else if (values.telefonoContacto.trim().length > 10) {
      errors.telefonoContacto = 'El telefono de contacto debe contener maximo 10 caracteres';
    }else if (values.telefonoContacto.trim().length < 7){
      errors.telefonoContacto = "El telefono de contacto debe contener minimo 7 caracteres"
    }

    if (!values.emailContacto || !/^[^@]+@[^@]+\.[^@]+$/.test(values.emailContacto)) {
      errors.emailContacto = 'Ingrese una dirección de correo electrónico válida';
    } else if (values.emailContacto.trim().length > 100) {
      errors.emailContacto = 'El correo electronico del contacto debe tener maximo 100 caracteres';
    }
  }

  return errors;
};

export default validateForm;
