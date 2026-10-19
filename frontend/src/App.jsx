// Responsabilidad: guardar el estado (lista de artículos, cuál se edita) y coordinar los componentes.
import { useEffect, useState } from "react"
import { eliminarArticulo, listarArticulos } from "./apiArticulos.js"
import TarjetaArticulo from "./TarjetaArticulo.jsx"
import FormularioArticulo from "./FormularioArticulo.jsx"
import "./App.css"

export default function App() {
  const [articulos, setArticulos] = useState([])
  const [formulario, setFormulario] = useState(null) // null = oculto · {} = nuevo · artículo = editar
  const [mensajeError, setMensajeError] = useState("")

  async function cargarArticulos() {
    try {
      setArticulos(await listarArticulos())
      setMensajeError("")
    } catch {
      setMensajeError("No se pudo conectar con el servidor. ¿Está encendido el backend (npm run dev)?")
    }
  }

  useEffect(() => { cargarArticulos() }, []) // al abrir la página, pide la lista

  async function eliminar(articulo) {
    if (!confirm(`¿Eliminar "${articulo.nombre}"?`)) return
    await eliminarArticulo(articulo.id)
    cargarArticulos()
  }

  function onGuardar() {
    setFormulario(null)
    cargarArticulos()
  }

  return (
    <main className="app">
      <header className="app-cabecera">
        <h1>Artículos</h1>
        <button onClick={() => setFormulario({})}>+ Nuevo artículo</button>
      </header>

      {mensajeError && <p className="mensaje-error">{mensajeError}</p>}

      {formulario && (
        <FormularioArticulo
          key={formulario.id ?? "nuevo"}
          articulo={formulario.id ? formulario : null}
          onGuardar={onGuardar}
          onCancelar={() => setFormulario(null)}
        />
      )}

      <section className="app-rejilla">
        {articulos.map(articulo => (
          <TarjetaArticulo key={articulo.id} articulo={articulo} onEditar={setFormulario} onEliminar={eliminar} />
        ))}
      </section>

      {!mensajeError && articulos.length === 0 && <p className="app-vacio">Todavía no hay artículos. ¡Crea el primero!</p>}
    </main>
  )
}