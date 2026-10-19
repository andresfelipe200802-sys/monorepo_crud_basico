// Responsabilidad: formulario para Crear o Editar. Arma el FormData (textos + archivo) y lo envía.
import { useState } from "react"
import { URL_BACKEND, crearArticulo, editarArticulo } from "./apiArticulos.js"
import "./FormularioArticulo.css"

const CAMPOS_VACIOS = { nombre: "", descripcion: "", precio_compra: "", precio_venta: "", stock_minimo: "", stock_maximo: "" }

// Máximo que acepta cada campo numérico (el mismo que soporta la base de datos)
const LIMITES = { precio_compra: 99999999.99, precio_venta: 99999999.99, stock_minimo: 2147483647, stock_maximo: 2147483647 }

export default function FormularioArticulo({ articulo, onGuardar, onCancelar }) {
  const [campos, setCampos] = useState(articulo ?? CAMPOS_VACIOS)
  const [archivo, setArchivo] = useState(null)             // la imagen elegida (si hay una nueva)
  const [mensajeError, setMensajeError] = useState("")

  const cambiarCampo = evento => {
    const { name, value } = evento.target
    if (name in LIMITES && Number(value) > LIMITES[name]) return // pasa del máximo: no deja escribir más
    setCampos({ ...campos, [name]: value })
  }

  // Vista previa: Se carga la foto nueva si se eligió, si no la que ya tenía el artículo
  const vistaPrevia = archivo ? URL.createObjectURL(archivo) : articulo?.imagen ? URL_BACKEND + articulo.imagen : null

  async function enviar(evento) {
    evento.preventDefault()
    setMensajeError("")
    const datosFormulario = new FormData()
    for (const nombre of Object.keys(CAMPOS_VACIOS)) datosFormulario.append(nombre, campos[nombre])
    if (archivo) datosFormulario.append("imagen", archivo)  // el nombre "imagen" debe coincidir con subirImagen.single("imagen")
    try {
      if (articulo) await editarArticulo(articulo.id, datosFormulario)
      else await crearArticulo(datosFormulario)
      onGuardar()
    } catch (error) {
      setMensajeError(error.message)
    }
  }

  return (
    <form className="form" onSubmit={enviar}>
      <h2>{articulo ? "Editar artículo" : "Nuevo artículo"}</h2>

      <label>Nombre<input name="nombre" value={campos.nombre} onChange={cambiarCampo} required /></label>
      <label>Descripción<textarea name="descripcion" value={campos.descripcion ?? ""} onChange={cambiarCampo} rows={3} /></label>

      <div className="form-fila">
        <label>Precio de compra<input type="number" min="0" max={LIMITES.precio_compra} step="0.01" name="precio_compra" value={campos.precio_compra} onChange={cambiarCampo} required /></label>
        <label>Precio de venta<input type="number" min="0" max={LIMITES.precio_venta} step="0.01" name="precio_venta" value={campos.precio_venta} onChange={cambiarCampo} required /></label>
      </div>
      <div className="form-fila">
        <label>Stock mínimo<input type="number" min="0" max={LIMITES.stock_minimo} name="stock_minimo" value={campos.stock_minimo} onChange={cambiarCampo} required /></label>
        <label>Stock máximo<input type="number" min="0" max={LIMITES.stock_maximo} name="stock_maximo" value={campos.stock_maximo} onChange={cambiarCampo} required /></label>
      </div>

      <label>Imagen<input type="file" accept="image/*" onChange={evento => setArchivo(evento.target.files[0] ?? null)} /></label>
      {vistaPrevia && <img className="form-vista" src={vistaPrevia} alt="Vista previa" />}

      {mensajeError && <p className="mensaje-error">{mensajeError}</p>}

      <div className="form-botones">
        <button type="submit">{articulo ? "Guardar cambios" : "Crear artículo"}</button>
        <button type="button" className="secundario" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  )
}