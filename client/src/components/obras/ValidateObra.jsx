import * as Yup from "yup"
export const obraSchemaAgg = Yup.object().shape({
  idCliente: Yup.string().required("Seleccione un cliente"),
  idEmp: Yup.string().required("Seleccione un asesor"),
  fechaini: Yup.date()
    .test(
      "fecha-inicio",
      "La fecha de inicio no puede ser anterior a la fecha actual",
      function (value) {
        const fechaActual = new Date();
        fechaActual.setDate(fechaActual.getDate() - 1); // Resta un día a la fecha actual
        return value > fechaActual;
      }
    )
    .max(
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
      "La fecha de inicio no puede exceder un mes desde la fecha actual"
    )
    .required("Seleccione la fecha de inicio de la obra"),
  descripcion: Yup.string().required("Ingrese la descripción de la obra").min(10,"La descripción de la obra debe contener al menos 10 caracteres.").max(100,"la descripción de la obra no debe contener más de 100 caracteres"),
});

const obraSchemaEdit = Yup.object().shape({
    idCliente: Yup.number()
      .required('El id del cliente es requerido'),
    idEmp: Yup.number()
      .required('El id del encargado es requerido'),
    area: Yup.string()
        .required("El area de la obra es requerida"),
    fechaini: Yup.date()
    .required('La fecha de inicio es requerida'),
    precio: Yup.number()
      .required('El precio es requerido'),
    estado: Yup.string()
      .required('El estado es requerido'),
    descripcion: Yup.string()
      .required('La descripcion es requerida'),
  });
  
  
  export const actividadSchema = (obra) => {
    // Restar un día a la fecha de inicio y sumar un día a la fecha de fin
    const fechainiObraAjustada = new Date(obra.fechainiObra);
    fechainiObraAjustada.setDate(fechainiObraAjustada.getDate() - 1);
  
    const fechafinObraAjustada = new Date(obra.fechafinObra);
    fechafinObraAjustada.setDate(fechafinObraAjustada.getDate() + 1);
  
    return Yup.object().shape({
      actividad: Yup.string().required('La actividad es obligatoria').min(3, "La actividad debe contener al menos 3 caracteres").max(60, "La actividad debe contener maximo 60 caracteres"),
      fechaini: Yup.date()
        .min(fechainiObraAjustada, 'La fecha de inicio de la actividad no puede ser anterior a la fecha de inicio del proyecto')
        // .max(fechafinObraAjustada, 'La fecha de inicio de la actividad no puede ser posterior a la fecha de finalización del proyecto')
        .required('La fecha de inicio de la actividad es obligatoria'),
  
      fechafin: Yup.number()
        .min(1, "Los dias estimados no pueden ser ingeriores ni iguales a 0")
        .required('Los dias estimados de finalización de la actividad son requeridos'),
        empleados: Yup.array().min(1, 'Seleccione al menos un empleado'),
      // estado: Yup.string().required('El estado es obligatorio'),
    });
  };
  
  export {
    obraSchemaEdit,
  };