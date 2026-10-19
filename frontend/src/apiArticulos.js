/* Responsabilidad: Este archivo habla con el backend. Los componentes no saben nada de fetch ni de URLs. */
export const URL_BACKEND = "http://localhost:3000"

async function leerRespuesta (respuesta) {
  const datos = await respuesta.json()
  if (!respuesta.ok) throw new Error (datos.error ?? "Error inesperado")
  return datos
}

export const listarArticulos = () => fetch (`${URL_BACKEND}/api/articulos`).then(leerRespuesta)

export const crearArticulo = datosFormulario =>
  fetch (`${URL_BACKEND}/api/articulos`, {method: "POST", body: datosFormulario}).then(leerRespuesta)

export const editarArticulo = (id, datosFormulario) =>
  fetch (`${URL_BACKEND}/api/articulos`, {method: "PUT", body: datosFormulario}).then(leerRespuesta)

export const eliminarArticulo = id =>
  fetch (`${URL_BACKEND}/api/articulos`, {method: "DELETE" }).then(leerRespuesta)
