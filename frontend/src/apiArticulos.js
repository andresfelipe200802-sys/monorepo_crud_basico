// Responsabilidad: hablar con el backend. Los componentes no saben nada de fetch ni de URLs.
export const URL_BACKEND = "http://localhost:3000"

async function leerRespuesta(respuesta) {
  const datos = await respuesta.json()
  if (!respuesta.ok) throw new Error(datos.error ?? "Error inesperado")
  return datos
}

export const listarArticulos = () => fetch(`${URL_BACKEND}/api/articulos`).then(leerRespuesta)

// `datosFormulario` lleva los textos y el archivo de la imagen (no se manda JSON porque hay un archivo)
export const crearArticulo = datosFormulario =>
  fetch(`${URL_BACKEND}/api/articulos`, { method: "POST", body: datosFormulario }).then(leerRespuesta)

export const editarArticulo = (id, datosFormulario) =>
  fetch(`${URL_BACKEND}/api/articulos/${id}`, { method: "PUT", body: datosFormulario }).then(leerRespuesta)

export const eliminarArticulo = id =>
  fetch(`${URL_BACKEND}/api/articulos/${id}`, { method: "DELETE" }).then(leerRespuesta)