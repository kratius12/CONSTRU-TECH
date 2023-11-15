import * as Yup from 'yup';
import dayjs from "dayjs";


const minFecha = dayjs().format("YYYY-MM-DD")

const ObraSchema = Yup.object().shape({
  descripcion: Yup.string()
   .min(8, 'La descripcion debe contener al menos 8 caracteres')
   .max(100, 'La descripcion no puede contener mas de 100 caracteres')
   .required('La descripcion es requerida')
   .trim(),
  cliente: Yup.string()
   .required('El cliente es requerido'),
  fechaini: Yup.date()
   .min(minFecha, "La fecha no puede ser anterior al dia de hoy")
   .required('La fecha de inicio es requerida'),
  empleados: Yup.string()
   .required('El empleado es requerido'),
//   material: Yup.string()
//    .required('El material es requerido, seleccione al menos uno'),
//   estado: Yup.string()
//    .required('El estado es requerido')
});

export default ObraSchema