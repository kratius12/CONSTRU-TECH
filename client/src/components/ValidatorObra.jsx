import * as Yup from 'yup';
import dayjs from "dayjs";


const minFecha = dayjs().format("YYYY-MM-DD")

// export const ObraSchema = Yup.object().shape({
//   descripcion: Yup.string()
//    .min(8, 'La descripcion debe contener al menos 8 caracteres')
//    .max(100, 'La descripcion no puede contener mas de 100 caracteres')
//    .required('La descripcion es requerida')
//    .trim(),
//    cliente: Yup.object().shape({
//     value: Yup.string(),
//     label: Yup.string()
//   }).nullable().required('El cliente es requerido, seleccione uno'),
//   fechaini: Yup.date()
//    .max(Yup.ref('fechafin'), "La fecha de inicio no puede ser superior a la fecha final")
//    .required('La fecha de inicio es requerida'),
//   fechafin: Yup.date()
//   .min(Yup.ref('fechaini'), "La fecha final no puede ser anterior a la fecha de inicio"),
//   empleados:  Yup.array().min(1, 'Selecciona al menos un material'),
//   material: Yup.array().min(1, 'Selecciona al menos un material'),
//   estado:  Yup.object().required('El estado es requerido')
// });




// export const validationSchema = (hasId) => {
//   const schema = Yup.object().shape({
//     descripcion: Yup.string()
//       .transform((originalValue, originalObject) => originalValue.trim().replace(/\s+/g, ' '))
//       .required('La descripción es requerida'),
  
//     cliente: Yup.object().shape({
//       id: Yup.string().required('El cliente es requerido, seleccione al menos uno')
//     }),
  
//     fechaini: Yup.date()
//       .required('La fecha de inicio es requerida'),
//   });

//   if (hasId) {
//     schema.shape({
//       descripcion: schema.fields.descripcion
//         .min(8, 'La descripción debe contener al menos 8 caracteres')
//         .max(100, 'La descripción no puede contener más de 100 caracteres'),
  
//       empleados: Yup.array().min(1, 'El empleado es requerido, seleccione al menos uno'),
//     });
//   } else {
//     schema.shape({
//       descripcion: schema.fields.descripcion
//         .min(5, 'La descripción debe contener al menos 5 caracteres')
//         .max(100, 'La descripción no puede contener más de 100 caracteres'),
  
//       empleados: Yup.object().shape({
//         value: Yup.string().required('El empleado es requerido, seleccione al menos uno'),
//       }),
//     });
//   }

//   return schema;
// };

export const ObraSchema = Yup.object().shape({
  descripcion: Yup.string()
    .transform((originalValue, originalObject) => originalValue.trim().replace(/\s+/g, ' '))
    .min(8, 'La descripción debe contener al menos 8 caracteres')
    .max(100, 'La descripción no puede contener más de 100 caracteres')
    .required('La descripción es requerida'),

    cliente: Yup.array()
    .min(1, 'El cliente es requerido, seleccione al menos uno')
    .when([], (originalValue, schema) => {
      return originalValue && originalValue.length === 0
        ? schema
        : schema.notRequired();
    }),

  fechaini: Yup.date()
    .required('La fecha de inicio es requerida'),

  empleados:  Yup.object().shape({
    value: Yup.string(),
    label: Yup.string()
  }).nullable().required('El empleado es requerido, seleccione uno')
  
});


export const getValidate = (values, hasId) => {
  const errors = {};
  console.log(values);
  if (hasId) {
      // Validación para la descripción   
    if (!values.descripcion) {
      errors.descripcion = 'La descripción es requerida';
    } else if (values.descripcion.trim().length < 8) {
      errors.descripcion = 'La descripción debe contener al menos 8 caracteres';
    } else if (values.descripcion.trim().length > 100) {
      errors.descripcion = 'La descripción no puede contener más de 100 caracteres';
    }
    if (values.descripcion && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(values.descripcion)) {
      errors.descripcion = 'No se permiten caracteres especiales en la descripción';
    }

    if (!values.area) {
      errors.area = 'El area es requerida';      
    } else if (values.area.trim().length < 8) {
      errors.area = 'El area debe contener al menos 8 caracteres';
    } else if (values.area.trim().length > 100) {
      errors.area = 'El area no puede contener más de 100 caracteres';
    }
    if (values.area && !/^[a-zA-Z0-9\s]+$/.test(values.area)) {
      errors.area = 'No se permiten caracteres especiales en el area';
    }
    if (!values.fechaini) {
      errors.fechaini = 'La fecha de inicio es requerida';
    }
  
    if (!values.fechafin) {
      errors.fechafin = 'La fecha final es requerida';
    }

    if (dayjs(values.fechaini).isAfter(dayjs(values.fechafin))) {
      errors.fechaini = 'La fecha de inicio no puede ser posterior a la fecha final';
    }
  
    // Validación de que fechafin no sea inferior a fechaini
    if (dayjs(values.fechafin).isBefore(dayjs(values.fechaini))) {
      errors.fechafin = 'La fecha final no puede ser anterior a la fecha de inicio';
    }
    return errors;
    
  }else{
      // Validación para la descripción
    if (!values.descripcion) {
      errors.descripcion = 'La descripción es requerida';
    } else if (values.descripcion.trim().length < 5) {
      errors.descripcion = 'La descripción debe contener al menos 5 caracteres';
    } else if (values.descripcion.trim().length > 100) {
      errors.descripcion = 'La descripción no puede contener más de 100 caracteres';
    }
    if (values.descripcion && !/^[a-zA-Z0-9\s]+$/.test(values.descripcion)) {
      errors.descripcion = 'No se permiten caracteres especiales en la descripción';
    }

    if (!values.cliente || !values.cliente.value) {
      errors.cliente = 'El cliente es requerido, seleccione al menos uno';
    }
  
    if (!values.fechaini) {
      errors.fechaini = 'La fecha de inicio es requerida';
    }
  
    if (!values.empleados || !values.empleados.value) {
      errors.empleados = 'El empleado es requerido, seleccione al menos uno';
    }

    if (values.actividades) {
      values.actividades.forEach((actividad, index) => {
        // Otras validaciones...
  
        // Validación para caracteres especiales en actividad
        if (actividad.actividad && !/^[a-zA-Z0-9\s]+$/.test(actividad.actividad)) {
          errors.actividades = errors.actividades || [];
          errors.actividades[index] = errors.actividades[index] || {};
          errors.actividades[index].actividad = 'No se permiten caracteres especiales';
        }
  
        // Otras validaciones...
      });
    }
  
    // Otras validaciones...
  
    // Validación para campos duplicados
    if (values.actividades) {
      const actividadesErrors = [];
  
      values.actividades.forEach((actividad, index) => {
        // Validación para caracteres especiales en otros campos duplicados
        // Agrega validaciones similares a las ya mencionadas anteriormente
  
        actividadesErrors[index] = {}; // Inicializa el objeto de errores para este elemento duplicado
  
        // Ejemplo de validación para otro campo duplicado (fecha de inicio)
        if (actividad.fechaini && !/^[a-zA-Z0-9\s]+$/.test(actividad.fechaini)) {
          actividadesErrors[index].fechaini = 'No se permiten caracteres especiales en la fecha de inicio';
        }
  
        // Otras validaciones para campos duplicados...
      });
  
      errors.actividades = actividadesErrors;
    }

    return errors;
  }
};