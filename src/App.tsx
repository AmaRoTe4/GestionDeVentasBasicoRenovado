import './global.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
import Ventas from './Pages/Ventas/index'
import Ajustes from './Pages/Ajustes/index'
import Productos from './Pages/Productos/index'
import AccionesProductos from './Pages/Productos/acciones'
import NavBar from "./components/navBar";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react'
import { CartelExpressError } from './components/carteles'

function App() {
	const [btnEstado, setBtnEstado] = useState<boolean>(false)

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			const target = e?.target;
			if (e.target.id === "fondoOscuro") setBtnEstado(false);
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<BrowserRouter>
			<NavBar
				btnEstado={btnEstado}
				setBtnEstado={setBtnEstado}
			/>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/Totales/" element={<Totales />} />
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/acciones/" element={<AccionesProductos />} />
				<Route path="/Productos/acciones/:id" element={<AccionesProductos />} />
				<Route path="/Ventas" element={<Ventas />} />
				<Route path="/Ajustes" element={<Ajustes />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
