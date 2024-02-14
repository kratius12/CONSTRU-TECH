import * as Yup from "yup"


export const obraSchemaAgg = Yup.object().shape({
    idCliente: Yup.string().required("Seleccione el cliente"),
    idEmp: Yup.string().required("El empleado es requerido"),
    fechaini: Yup.date().required("La fecha de incio de la obra es requerida")
        .min(new Date().toISOString(), 'La fecha de inicio debe ser posterior o igual a la fecha actual')
        // .max(addMonths(new Date(), 1), 'La fecha de inicio no puede ser posterior a un mes a partir de la fecha actual')
        ,
    descripcion: Yup.string().required("La descripción de obra de requerida").min(10, "La descripción de la obra debe tener minimo 10 caracteres"),
})
export const obraSchemaEdit = Yup.object().shape({
    idCliente: Yup.string().required("Seleccione el cliente"),
    idEmp: Yup.string().required("El empleado es requerido"),
    area: Yup.string().required("El area es requerida"),
    fechaini: Yup.date()
        .required("La fecha de inicio de la obra es requerida"),
    fechafin: Yup.date()
        .min(Yup.ref('fechaini'), 'La fecha de fin debe ser posterior a la fecha de inicio')
        .required("La fecha de fin de la obra es requerida"),
    precio: Yup.string().required("El precio de la obra es requerido"),
    descripcion: Yup.string().required("La descripción de obra de requerida").min(10, "La descripción de la obra debe tener minimo 10 caracteres"),
    estado: Yup.string().required("El estado es requerido"),
});

export const actividadSchema = (obra) => Yup.object().shape({
    actividad: Yup.string().required('La actividad es obligatoria'),
    fechaini: Yup.date()
        .min(obra.fechainiObra, 'La fecha de inicio de la actividad no puede ser anterior a la fecha de inicio del proyecto')
        .max(obra.fechafinObra, 'La fecha de inicio de la actividad no puede ser posterior a la fecha de finalización del proyecto')
        .required('La fecha de inicio de la actividad es obligatoria'),
    fechafin: Yup.date()
        .min(Yup.ref('fechaini'), 'La fecha de finalización de la actividad no puede ser anterior a la fecha de inicio de la actividad')
        .max(obra.fechafinObra, 'La fecha de finalización de la actividad no puede ser posterior a la fecha de finalización del proyecto')
        .required('La fecha de finalización de la actividad es obligatoria'),
    actividades: Yup.object().shape({
        materiales: Yup.array().min(1, 'Seleccione al menos un material'),
        empleados: Yup.array().min(1, 'Seleccione al menos un empleado'),
    }),
    estado: Yup.string().required('El estado es obligatorio'),
},
console.log(obra)
);