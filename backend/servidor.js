/* Responsabilidad: Encender el servidor y conectar las piezas (CORS, JSON, imagenes y rutas). */
import express, { application } from "express"
import cors from "cors"
import rutasArticulos from "./rutasArticulos.js"
import {CARPETA_IMAGENES} from "./subirImagen.js"

const aplicacion = express()
const PUERTO = 3000

aplicacion.use(cors())/* Permite que react (puerto 5173) llame a este servidor */
aplicacion.use(express.json())/* Enciende peticiones con formato o cuerpo.JSON */
aplicacion.use("/uploads", express.static(CARPETA_IMAGENES))/* En el entorno local muestra la imagen */
aplicacion.use("/api/articulos", rutasArticulos)/* Todas las rutas del CRUD */

/* Errores de multer (archivo demasiado grande, etc)*/
aplicacion.use((error, peticion, respuesta, siguiente)=>{
    const mensaje = error.code === "LIMIT_FILE_SIZE"
    ? "La imagen es demasiado pesada (maximo 2 MB)"
    : error.message
    respuesta.status(400).json({ error: mensaje})
})

aplicacion.listen(PUERTO, ()=> console.log(`servidor corriendo en http://localhost:${PUERTO}`))
