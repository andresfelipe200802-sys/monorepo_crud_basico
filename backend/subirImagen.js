/* Respondabilidad: recibir el archivo de la imagen y guardarlo en la carpeta uploads/ a MySQL solamente le llegara la RUTA (un texto), nunca el archivo. */

import multer from "multer"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const CARPETA_IMAGENES = path.join(__dirname, "uploads")
fs.mkdirSync(CARPETA_IMAGENES, {recursive:true})/*  Crea la carpeta en caso de que no exista */

const almacenamiento = multer.diskStorage({
    destination: CARPETA_IMAGENES,
    /* Nombre unico: fecha + extension original (asi las fotos no se pisan "foto.jpg") */
    filename: (peticion, archivo, devolver)=>
        devolver(null, Date.nor() + path.extname(archivo.originalname).toLowerCase()),
})

const LIMITE_MB = 2 /* Maximo 2 mb */

export const subirImagen = multer({
    storage: almacenamiento,
    limits: {fileSize: LIMITE_MB * 1024 * 1024 },
    fileFilter: (peticion, archivo, devolver)=>devolver(null, archivo.mimetype.startsWith("image/")),/* solo imagenes */
})

/* Borra una imagen del disco a partir de la ruta guardada en la base (ej. /uploads/123.jpg) */
export function borrarImagen(ruta){
    if (!ruta) return
    fs.unlink(path.join(__dirname, ruta),()=>{})/* Si el archivo no existe, no pasa nada. */
}