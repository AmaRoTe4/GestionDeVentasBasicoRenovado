import { useState } from "react";
import { Link } from "react-router-dom";
import FlechaArriba from "../../svg/flechaArriba.svg"
import Remove from "../../svg/delete.svg"

export default function Totales() {
    const [vistaVentas, setVistasVentas] = useState<boolean>(false);
    const [vistaProductos, setVistasProductos] = useState<boolean>(false);

    return (
        <main className="w-full min-h-[90vh] bg-gris_claro pb-[100px]">
            <div className='w-full h-[70px] flex justify-center items-center'>
                <h1 className="text-2xl font-black">Totales</h1>
            </div>
            <div className='w-full h-auto flex flex-col justify-center items-center border-t border-black py-5'>
                <h2 className="text-2xl font-black">Ventas</h2>
                <ListaVentas />
            </div>
            <div className='w-full h-auto flex flex-col justify-center items-center border-t border-black py-5'>
                <h2 className="text-2xl font-black">Productos</h2>
                <ListaProductos />
            </div>
        </main>
    )
}

export const ListaVentas = () => {
    const [ventas, setVentas] = useState<string[]>(["1", "2", "3", "4", "5"])
    const [vista, setVista] = useState<boolean>(false)

    return (
        <div className='flex flex-col items-center w-full md:w-[60%] h-auto'>
            <div className="w-full px-4 py-3 flex items-center">
                <button
                    type="button"
                    className={`hover:cursor-pointer transition-all duration-100 ease-linear ${vista && "rotate-180"}`}
                    onClick={e => { e.preventDefault(); setVista(n => !n) }}
                >
                    <FlechaArriba />
                </button>
            </div>
            <ul className={`
                flex flex-col items-center text-lg w-[100%] px-4 py-1 gap-2 max-h-[50vh] h-auto overflow-y-scroll overflow-x-hidden transition-all duration-[50] ease-linear
                ${vista ? "opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto max-h-0"}
            `}>
                <li className={`
                    ${vista ? "absolute flex opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto hidden"} 
                        py-1 px-5 w-full md:w-[50%] flex bg-slate-300 
                        justify-between items-center 
                        text-sm md:text-base
                        transition-all duration-100 ease-linear
                    `}
                    onClick={e => { e.preventDefault(); }}
                >
                    <p className=' mx-[2.5%] text-center'>
                        Hora
                    </p>
                    <p className=' mx-[2.5%] text-center'>
                        Cantidad productos
                    </p>
                    <p className=' mx-[2.5%] text-center'>
                        Precio total
                    </p>
                </li>
                {ventas.map((n, i) =>
                    <li className={`
                    ${i === 0 ? "mt-14" : ""}
                    ${vista ? "flex opacity-100 z-10 hover:opacity-75 hover:cursor-pointer" : "-z-10 opacity-0 hover:cursor-auto"} 
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        onClick={e => { e.preventDefault(); }}
                    >
                        <p className='w-[25%] text-start ms-[7.5%]'>
                            9:00
                        </p>
                        <p className='w-[25%] text-center ms-[2.5%]'>
                            10
                        </p>
                        <p className='w-[25%] text-end ms-[2.5%]'>
                            $10000
                        </p>
                        <button className='h-full w-[5%] ms-[2.5%] hover:opacity-75 hover:cursor-pointer'>
                            {/* @ts-ignore */}
                            <Remove className="h-full w-full" />
                        </button>
                    </li>
                )}
            </ul>
            <div className={`
                        py-2 px-9 w-full
                        flex bg-green-500 justify-between items-center
                        md:border md:border-black
                        transition-all duration-100 ease-in-out
                    `}
                onClick={e => { e.preventDefault(); }}
            >
                <p className='w-full text-justify me-5'>
                    Total
                </p>
                <p className='w-[100px]'>
                    $100000
                </p>
            </div>
        </div>
    )
}

export const ListaProductos = () => {
    const [ventas, setVentas] = useState<string[]>(["1", "2", "3", "4", "5"])
    const [vista, setVista] = useState<boolean>(false)

    return (
        <div className='flex flex-col items-center w-full md:w-[60%] h-auto'>
            <div className="w-full px-4 py-3 flex items-center">
                <button
                    type="button"
                    className={`hover:cursor-pointer transition-all duration-100 ease-linear ${vista && "rotate-180"}`}
                    onClick={e => { e.preventDefault(); setVista(n => !n) }}
                >
                    <FlechaArriba />
                </button>
            </div>
            <ul className={`
                flex flex-col items-center text-lg w-[100%] px-4 py-1 gap-2 max-h-[50vh] h-auto overflow-y-scroll overflow-x-hidden transition-all duration-[50] ease-linear
                ${vista ? "opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto max-h-0"}
            `}>
                <li className={`
                    ${vista ? "absolute flex opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto hidden"} 
                        py-1 px-2 w-full md:w-[500px] flex bg-slate-300 
                        justify-between items-center 
                        text-sm md:text-base
                        transition-all duration-100 ease-linear
                    `}
                    onClick={e => { e.preventDefault(); }}
                >
                    <p className='w-[100px] mx-[2.5%] text-center'>
                        Nombre
                    </p>
                    <p className='w-[100px] mx-[2.5%] text-center'>
                        Cantidad Vendida
                    </p>
                    <p className='w-[100px] mx-[2.5%] text-center'>
                        Valor Acomulado
                    </p>
                </li>
                {ventas.map((n, i) =>
                    <li className={`
                    ${i === 0 ? "mt-20" : ""}
                    ${vista ? "flex opacity-100 z-10 hover:opacity-75 hover:cursor-pointer" : "-z-10 opacity-0 hover:cursor-auto"} 
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        onClick={e => { e.preventDefault(); }}
                    >
                        <p className='w-[25%] text-start ms-[7.5%]'>
                            9:00
                        </p>
                        <p className='w-[25%] text-center ms-[2.5%]'>
                            10
                        </p>
                        <p className='w-[25%] text-end ms-[2.5%]'>
                            $10000
                        </p>
                    </li>
                )}
            </ul>
            <div className={`
                        py-2 px-9 w-full
                        flex bg-green-500 justify-between items-center
                        md:border md:border-black
                        transition-all duration-100 ease-in-out
                    `}
                onClick={e => { e.preventDefault(); }}
            >
                <p className='w-full text-justify me-5'>
                    Total
                </p>
                <p className='w-[100px]'>
                    $100000
                </p>
            </div>
        </div>
    )
}