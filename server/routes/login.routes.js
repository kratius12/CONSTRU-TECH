import {Router, json} from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { genSalt as bcryptGenSalt, hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const resend = new Resend('re_cg4HtbhW_3BQtnVsVsKBhaKidq7A1GoAU');
const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await prisma.empleado.findUnique({
        where: {
          email: username,
          estado: 1
        }, 
        include:{
            rolpermisoempleado:{
                select:{
                    id:true,
                    idEmp:true,
                    idPer:true,
                    idRol:true, 
                    
                    permiso:true,
                    rol:true
                }
            }
        }
      });
  
      if (!user) {
        res.status(404).json({ error: 'Credenciales incorrectas.' });
        return;
      }

      const passwordsMatch = await bcryptCompare(password, user.contrasena);
      
      if (passwordsMatch) {
        const token = jwt.sign({ nombres: user.nombre+'-'+user.apellidos, email: user.email, rolesPermisos: user.rolpermisoempleado }, SECRET_KEY, { expiresIn: '2h' });
        
        res.status(200).json({ token });
      } else {
        res.status(404).json({ error: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

router.post('/sendCode', async (req, res) => {
  try {
    const {email} = req.body

    const user = await prisma.empleado.findUnique({
      where:{
        email:email
      }
    })
    if (user) {
      const code = Math.floor(1000 + Math.random() * 9000);
      await prisma.codigos.create({
        data:{
          codigo: String(code),
          email:email,
          estado: 1
        }
      })

      const {data, error} = await resend.emails.send({
        from:"onboarding@resend.dev",
        to: email,
        subject:'Codigo de confirmacion',
        html: `Codigo de confirmacion: ${code}`
      })

      if (error) {
        return res.status(400).json({error})
        
      }
      return res.status(200).json({data})
      
    }else{
      res.status(404).json({error: `No se encontro el email enviado: ${email}`})
    }

  } catch (error) {
    console.log(error)
  }
});

router.post('/checkCode', async (req, res) =>{
  try {
    const {code} = req.body

    const validCode = await prisma.codigos.findUnique({
      where:{
        codigo:code,
      }
    })
    if (validCode) {
      const checkedCode = await prisma.codigos.update({
        where:{
          Id:parseInt(validCode.Id)
        },
        data:{
          estado:0
        }
      })

      if (!checkedCode) {
        return res.status(404).json({error: "Codigo invalido"})
        
      }
      return res.status(200).json({success:true, code: validCode.email})
      
    }else{
      res.status(404).json({error: `Codigo incorrecto`})
    }

  } catch (error) {
    console.log(error)
  }
});

const generarHash = async (password, saltRounds = 10) => {
  const salt = await bcryptGenSalt(saltRounds);
  const hash = await bcryptHash(password, salt);
  return hash;
};

router.post('/password', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await prisma.empleado.findUnique({
      where:{
        email:email
      }
    })

    if (user) {
      const hashedPass = await generarHash(password)
      const changePass = await prisma.empleado.update({
        where:{
          email:email
        },
        data:{
          contrasena: hashedPass
        }
      })

      if (changePass) {
        return res.status(200).json({success:true})
      }

      return res.status(400).json({error:"No se pudo cambiar la contraseña"})

    } else {
      return res.status(404).json({error:"Usuario no encontrado"})
    }

  } catch (error) {
    console.log(error)
  }

});
export default router