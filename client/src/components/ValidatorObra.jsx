import * as Yup from 'yup';
import dayjs from "dayjs";


const minFecha = dayjs().format("YYYY-MM-DD")

const ObraSchema = Yup.object().shape({
  descripcion: Yup.string()
   .min(8, 'La descripcion debe contener al menos 8 caracteres')
   .max(100, 'La descripcion no puede contener mas de 100 caracteres')
   .required('La descripcion es requerida')
   .trim(),
   cliente: Yup.object().shape({
    value: Yup.string(),
    label: Yup.string()
  }).nullable().required('El cliente es requerido, seleccione uno'),
  fechaini: Yup.date()
  //  .min(minFecha, "La fecha de inicio no puede ser anterior al dia de hoy")
   .max(Yup.ref('fechafin'), "La fecha de inicio no puede ser superior a la fecha final")
   .required('La fecha de inicio es requerida'),
  fechafin: Yup.date()
  .min(Yup.ref('fechaini'), "La fecha final no puede ser anterior a la fecha de inicio"),
  empleados: Yup.array()
   .required('El empleado es requerido'),
  material: Yup.array()
  .min(1, 'Selecciona al menos un material')
  .of(
    Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
  )
  .nullable()
  .required('El material es requerido, selecciona al menos uno'),
  estado:  Yup.object().shape({
    value: Yup.string(),
    label: Yup.string()
  }).nullable().required('El estado es requerido, seleccione uno')
});

export default ObraSchema