import * as Yup from "yup"

export const obraSchemaAgg = Yup.object().shape({
    idCliente: Yup.string().required("Seleccione el cliente"),
    idEmp: Yup.string().required("El empleado es requerido"),
    // area: Yup.string().required("El area es requerida"),
    fechaini: Yup.date().required("La fecha de incio de la obra es requerida"),
    // fechafin: Yup.date().required("La fecha de fin de la obra es requerida"),
    // precio: Yup.string().required("El precio de la obra es requerido"),
    descripcion: Yup.string().required("La descripción de obra de requerida"),
    // estado: Yup.string().required("El estado es requerido"),
})
export const obraSchemaEdit = Yup.object().shape({
    idCliente: Yup.string().required("Seleccione el cliente"),
    idEmp: Yup.string().required("El empleado es requerido"),
    area: Yup.string().required("El area es requerida"),
    fechaini: Yup.date().required("La fecha de incio de la obra es requerida"),
    fechafin: Yup.date().required("La fecha de fin de la obra es requerida"),
    precio: Yup.string().required("El precio de la obra es requerido"),
    descripcion: Yup.string().required("La descripción de obra de requerida"),
    estado: Yup.string().required("El estado es requerido"),
    actividades: Yup.array().of(
        Yup.object().shape({
            descripcion: Yup.string().required("La descripción de la actividad es requerida"),
            fechaini: Yup.date().required("La fecha de inicio de la actividad es requerida"),
            fechafin: Yup.date().required("La fecha de fin de la actividad es requerida"),
            materiales: Yup.array().min(1, "Debe seleccionar al menos un material"),
            empleados: Yup.array().min(1, "Debe seleccionar al menos un empleado"),
            estadoAct: Yup.string().required("El estado de la actividad es requerido")
        })
    ).min(1, "Debe agregar al menos una actividad")
})