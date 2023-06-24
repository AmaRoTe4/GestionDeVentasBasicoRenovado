import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from "../svg/menu.svg"

export default function NavBar() {
    const location = useLocation().pathname
    const id: number = parseInt(useLocation().pathname.split('/')[3])
    const [btnEstado, setBtnEstado] = useState<boolean>(false)

    return (
        <nav 
            className="bg-verde w-full min-h-[60px] h-[10vh] flex items-center"
        >
            <button className='md:hidden ms-5' onClick={e => {e.preventDefault(); setBtnEstado(!btnEstado)}}>
                {/* @ts-ignore */}
                <Menu className="h-[30px] hover:opacity-50" />
            </button>
            <ul className={`w-[95%] h-[95%] 
                ${!btnEstado 
                    ? "hidden" 
                    : "flex flex-col translate-y-44 transition-all duration-200 bg-inherit absolute top-0 right-[10vw] h-[220px] w-[80vw] rounded-md border border-black"} 
                md:flex items-center justify-center md:justify-start`}>
                <li className="w-[100px] h-[40px] flex justify-center items-center">
                    <Link to="/"
                        className={`text-white text-xl hover:opacity-50 ${location === '/' ? "font-black underline decoration-sky-500" : "font-medium"}`}
                        aria-current="page"
                        onClick={e => setBtnEstado(false)}
                    >Main</Link>
                </li>
                <li className="w-[100px] h-[40px] flex justify-center items-center">
                    <Link
                        to="/Productos"
                        className={`text-white text-xl hover:opacity-50 
                            ${location === '/Productos' 
                            || location === `/Productos/Acciones/${id}`
                            || location === `/Productos/Acciones/`
                            ? "font-black underline decoration-sky-500" : "font-medium"}
                        `}
                        aria-current="page"
                        onClick={e => setBtnEstado(false)}
                    >Productos</Link>
                </li>
                <li className="w-[100px] h-[40px] flex justify-center items-center">
                    <Link
                        to="/Ventas"
                        className={`text-white text-xl hover:opacity-50 
                            ${location === '/Ventas' 
                            ? "font-black underline decoration-sky-500" 
                            : "font-medium" 
                        }`}
                        aria-current="page"
                        onClick={e => setBtnEstado(false)}
                    >Ventas</Link>
                </li>
                <li className="w-[100px] h-[40px] flex justify-center items-center"
                >
                    <Link
                        to="/Totales"
                        className={`text-white text-xl hover:opacity-50 
                        ${location === '/Totales' ||
                            location === '/Totales/ventas' ||
                            location === `/Totales/ventas/${id}`
                            ? "font-black underline decoration-sky-500" 
                            : "font-medium"}
                        `}
                        aria-current="page"
                        onClick={e => setBtnEstado(false)}
                    >Totales</Link>
                </li>
                <li className="w-[100px] h-[40px] flex justify-center items-center">
                    <Link
                        to="/Ajustes"
                        className={`text-white text-xl hover:opacity-50
                        ${location === '/Ajustes' 
                            ? "font-black underline decoration-sky-500" 
                            : "font-medium"}
                        `}
                        aria-current="page"
                        onClick={e => setBtnEstado(false)}
                    >Ajustes</Link>
                </li>
            </ul>
        </nav>
    )
}