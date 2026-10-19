// Responsabilidad: mostrar UN artículo. No pide datos ni los modifica: solo los pinta.
import { URL_BACKEND } from "./apiArticulos.js"
import "./TarjetaArticulo.css"

const formatearPesos = numero => Number(numero).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })

export default function TarjetaArticulo({ articulo, onEditar, onEliminar }) {
  const { nombre, descripcion, precio_compra, precio_venta, stock_minimo, stock_maximo, imagen } = articulo
  const margen = precio_venta - precio_compra          // se calcula aquí, no se guarda en la base de datos

  return (
    <article className="card">
      {imagen ? <img src={URL_BACKEND + imagen} alt={nombre} /> : <div className="card-sin-imagen">Sin imagen</div>}

      <div className="card-cuerpo">
        <h3>{nombre}</h3>
        <p className="card-descripcion">{descripcion}</p>

        <dl className="card-datos">
          <div><dt>Compra</dt><dd>{formatearPesos(precio_compra)}</dd></div>
          <div><dt>Venta</dt><dd>{formatearPesos(precio_venta)}</dd></div>
          <div><dt>Stock mín.</dt><dd>{stock_minimo}</dd></div>
          <div><dt>Stock máx.</dt><dd>{stock_maximo}</dd></div>
        </dl>

        <span className={`card-margen ${margen < 0 ? "card-margen-negativo" : ""}`}>Margen: {formatearPesos(margen)}</span>

        <div className="card-botones">
          <button onClick={() => onEditar(articulo)}>Editar</button>
          <button className="peligro" onClick={() => onEliminar(articulo)}>Eliminar</button>
        </div>
      </div>
    </article>
  )
}