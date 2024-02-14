const validateForm = (values) => {
    const errors = {};
  
    if (!values.tipo) {
      errors.tipo = 'Seleccione el tipo de proveedor*';
    }
  
    if (!values.nit || values.nit.trim() === '') {
      errors.nit = 'Este campo es obligatorio';
    } else if (values.nit.trim().length > 50) {
      errors.nit = 'Máximo 50 caracteres';
    }
  
    if (!values.nombre || values.nombre.trim() === '') {
      errors.nombre = 'Este campo es obligatorio';
    } else if (values.nombre.trim().length > 100) {
      errors.nombre = 'Máximo 100 caracteres';
    }
  
    if (!values.email || !/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
      errors.email = 'Ingrese una dirección de correo electrónico válida';
    } else if (values.email.trim().length > 100) {
      errors.email = 'Máximo 100 caracteres';
    }
  
    if (!values.direccion || values.direccion.trim() === '') {
      errors.direccion = 'Este campo es obligatorio';
    } else if (values.direccion.trim().length > 200) {
      errors.direccion = 'Máximo 200 caracteres';
    }
  
    if (!values.telefono || values.telefono.trim() === '') {
      errors.telefono = 'Este campo es obligatorio';
    } else if (values.telefono.trim().length > 20) {
      errors.telefono = 'Máximo 20 caracteres';
    }
  
    if (values.tipo === 'Juridico') {
      if (!values.nombreContacto || values.nombreContacto.trim() === '') {
        errors.nombreContacto = 'Este campo es obligatorio';
      } else if (values.nombreContacto.trim().length > 100) {
        errors.nombreContacto = 'Máximo 100 caracteres';
      }
  
      if (!values.telefonoContacto || values.telefonoContacto.trim() === '') {
        errors.telefonoContacto = 'Este campo es obligatorio';
      } else if (values.telefonoContacto.trim().length > 20) {
        errors.telefonoContacto = 'Máximo 20 caracteres';
      }
  
      if (!values.emailContacto || !/^[^@]+@[^@]+\.[^@]+$/.test(values.emailContacto)) {
        errors.emailContacto = 'Ingrese una dirección de correo electrónico válida';
      } else if (values.emailContacto.trim().length > 100) {
        errors.emailContacto = 'Máximo 100 caracteres';
      }
    }
  
    return errors;
  };

export default validateForm