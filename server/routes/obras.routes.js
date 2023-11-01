import {Router} from "express";
import {
    getObras,
    getObra,
    createObra,
    updateObra,
    deleteObra
} from "../controllers/obras.controller.js"

const router = Router()

router.get("/obras", getObras)

router.get("/obra/:id", getObra)

router.post("/obras", createObra)

router.put("/obra/:id", updateObra)

router.delete("/obra/:id", deleteObra)

 export default router