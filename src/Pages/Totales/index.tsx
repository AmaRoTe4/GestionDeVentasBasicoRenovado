import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlechaArriba from "../../svg/flechaArriba.svg"
import Remove from "../../svg/delete.svg"
import { Producto, Venta } from "../../types";
import { GetAllVenta } from "../../functions/ventas";
import { GetAllProducto } from "../../functions/productos";

export default function Totales() {
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
    const [ventas, setVentas] = useState<Venta[]>([])
    const [precioT, setPrecioT] = useState<number>(0)
    const [vista, setVista] = useState<boolean>(false)

    useEffect(() => {
        cargarVentas();
        calcularTotales();
    },[ventas])
    
    const cargarVentas = () => {
        if(ventas.length > 0) return;
        const aux:Venta[] = GetAllVenta()
        if(!aux) return;
        if(aux.length === 0) return;
        setVentas(aux); 
    }

    const calcularTotales = () => {
        if(!ventas) return;
        let total = 0;
        ventas.forEach(n => total += n.precioT)
        setPrecioT(total);
    }

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
                <span className={`
                    ${vista ? "flex opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto hidden"} 
                        py-1 px-5 ms-5 w-full flex bg-slate-300 
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
                </span>
            </div>
            <ul className={`
                flex flex-col items-center text-lg w-[100%] px-4 py-1 gap-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden transition-all duration-[100] ease-linear mb-3
                ${vista ? "opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto max-h-0 h-0"}
            `}>
                {ventas && ventas.map((n, i) =>
                    <li className={`
                    ${i === 0 ? "mt-4" : ""}
                    ${vista ? "flex opacity-100 z-10 hover:opacity-75 hover:cursor-pointer" : "-z-10 opacity-0 hover:cursor-auto"} 
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        onClick={e => { e.preventDefault(); }}
                        key={n.id}
                    >
                        <p className='w-[25%] text-start ms-[7.5%]'>
                            {n.fecha}
                        </p>
                        <p className='w-[25%] text-center ms-[2.5%]'>
                            {n.cantidadPV}
                        </p>
                        <p className='w-[25%] text-end ms-[2.5%]'>
                            ${n.precioT}
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
                    ${precioT}
                </p>
            </div>
        </div>
    )
}

export const ListaProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([])
    const [vista, setVista] = useState<boolean>(false)

    useEffect(() => {
        cargarProducto();
    },[])
    
    const cargarProducto = () => {
        const aux:Producto[] = GetAllProducto()
        if(!aux) return;
        if(aux.length === 0) return;
        setProductos(aux); 
    }

    return (
        <div className='flex flex-col items-center w-full md:w-[60%] h-auto border-b border-black'>
            <div className="w-full px-4 py-3 flex items-center">
                <button
                    type="button"
                    className={`hover:cursor-pointer transition-all duration-100 ease-linear ${vista && "rotate-180"}`}
                    onClick={e => { e.preventDefault(); setVista(n => !n) }}
                >
                    <FlechaArriba />
                </button>
                <li className={`
                    ${vista ? "flex opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto hidden"} 
                        py-1 px-2 ms-5 w-full flex bg-slate-300 
                        justify-between items-center 
                        text-sm md:text-base
                        transition-all duration-100 ease-linear
                    `}
                    onClick={e => { e.preventDefault(); }}
                >
                    <p className='w-[33%] mx-[2.5%] text-start'>
                        Nombre
                    </p>
                    <p className='w-[33%] mx-[2.5%] text-center'>
                        Cantidad Vendida
                    </p>
                    <p className='w-[33%] mx-[2.5%] text-center md:text-end'>
                        Valor Acomulado
                    </p>
                </li>
            </div>
            <ul className={`
                flex flex-col items-center text-lg w-[100%] px-4 py-1 gap-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden transition-all duration-[100] ease-linear mb-3
                ${vista ? "opacity-100 z-50" : "-z-10 opacity-0 hover:cursor-auto max-h-0 h-0"}
            `}>
                {productos && productos.map((n, i) =>
                    <li className={`
                    ${i === 0 ? "mt-4" : ""}
                    ${vista ? "flex opacity-100 z-10 hover:opacity-75 hover:cursor-pointer" : "-z-10 opacity-0 hover:cursor-auto"} 
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        onClick={e => { e.preventDefault(); }}
                        key={n.id}
                    >
                        <p className='w-[25%] text-start ms-[7.5%]'>
                            {n.nombre}
                        </p>
                        <p className='w-[25%] text-center ms-[2.5%]'>
                            {n.vendidos}
                        </p>
                        <p className='w-[25%] text-end ms-[2.5%]'>
                            ${n.vendidos * n.precio}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    )
}