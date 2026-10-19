// Responsabilidad: recibir el archivo de la imagen y guardarlo en la carpeta uploads/.
// A MySQL solo le llegará la RUTA (un texto), nunca el archivo.
import multer from "multer"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const CARPETA_IMAGENES = path.join(__dirname, "uploads")
fs.mkdirSync(CARPETA_IMAGENES, { recursive: true })   // crea la carpeta si no existe

const almacenamiento = multer.diskStorage({
  destination: CARPETA_IMAGENES,
  // Nombre único: fecha + extensión original (así dos fotos "foto.jpg" no se pisan)
  filename: (peticion, archivo, devolver) =>
    devolver(null, Date.now() + path.extname(archivo.originalname).toLowerCase()),
})

const LIMITE_MB = 2 // máximo 2 MB

export const subirImagen = multer({
  storage: almacenamiento,
  limits: { fileSize: LIMITE_MB * 1024 * 1024 },                                        
  fileFilter: (peticion, archivo, devolver) => devolver(null, archivo.mimetype.startsWith("image/")), // solo imágenes
})

/** Borra una imagen del disco a partir de la ruta guardada en la base (ej. /uploads/123.jpg). */
export function borrarImagen(ruta) {
  if (!ruta) return
  fs.unlink(path.join(__dirname, ruta), () => {})     // si el archivo no existe, no pasa nada
}