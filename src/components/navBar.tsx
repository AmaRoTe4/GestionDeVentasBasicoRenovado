import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from "../svg/menu.svg"
import FondoOscuro from './fondoOscuro'

interface props {
    btnEstado:boolean
    setBtnEstado:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar({btnEstado , setBtnEstado}:props) {
    const location = useLocation().pathname
    const id: number = parseInt(useLocation().pathname.split('/')[3])

    return (
        <>
            <FondoOscuro vista={btnEstado} />
            <nav
                id="NavBar"
                className="bg-verde w-full min-h-[60px] h-[10vh] flex items-center justify-center md:justify-start"
            >
                <button className='md:hidden ms-5 w-full' onClick={e => { e.preventDefault(); setBtnEstado(!btnEstado) }}>
                    {/* @ts-ignore */}
                    <Menu className="h-[30px] hover:opacity-50" />
                </button>
                <ul 
                    id="NavBarUl"
                    className={`absolute md:relative top-0 transition-all max-h-[220px] md:max-h-auto duration-100 w-[80%] h-[95%] flex items-center justify-center md:justify-start z-[100] 
                    ${!btnEstado
                        ? "translate-x-[100vw] md:translate-x-0 translate-y-0 opacity-[0] md:opacity-[100]"
                        : `
                        bg-inherit rounded-md border border-black
                        flex-col 
                        translate-y-44 
                    `}`}>
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
        </>
    )
}