import {Router} from "express";
import {
    getMateriales,
    getMaterial,
    createMaterial,
    updateMaterial,
    deleteMaterial
} from "../controllers/materiales.controller.js"

const router = Router()

router.get("/materiales", getMateriales)

router.get("/material/:id", getMaterial)

router.post("/materiales", createMaterial)

router.put("/material/:id", updateMaterial)

router.delete("/material/:id", deleteMaterial)

 export default router