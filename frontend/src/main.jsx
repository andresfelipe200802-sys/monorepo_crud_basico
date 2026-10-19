import { createRoot } from "react-dom/client"
import "./global.css" // primero el global, para que cada componente pueda ajustar encima
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(<App />)