// Responsabilidad: conectarse a MySQL. Ningún otro archivo conoce la contraseña ni el nombre de la base.
import mysql from "mysql2/promise"

// Un "pool" (piscina) reutiliza conexiones abiertas: se utilizar en proyectos reales.
export const baseDatos = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "root",   // Escribir la clave del gestor MySQL
  database: process.env.DB_NAME ?? "tienda",
})