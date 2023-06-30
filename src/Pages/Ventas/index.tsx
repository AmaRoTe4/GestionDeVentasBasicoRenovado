import { useEffect, useRef, useState } from 'react'
//import { InterProductos , } from "../../types."
//import TablaVentas from '../../components/tabla';
//import { mostrarTodosLosProductos , mostrarProductoNombre} from '../../database/productos'
//import { AgreProducto } from '../../functions/productos'
//import { RealizarVenta } from '../../functions/ventas'
import { Bounce, toast } from 'react-toastify'
import FlechaArriba from "../../svg/flechaArriba.svg"
import Remove from "../../svg/delete.svg"
import { Producto, Venta } from '../../types'
import { GetAllProducto } from '../../functions/productos'

export default function Ventas() {
    const [cantidadPV, setCantidadPV] = useState<number>(0)
    const [precioT, setPrecioT] = useState<number>(0)

    const [prtsPorVender, setPrtsPorVender] = useState<Producto[]>([])
    const [prod, setProd] = useState<Producto[]>([])
    const [prodUsar, setProdUsar] = useState<Producto[]>([])
    const [prodSelect, setProdSelect] = useState<Producto>({
        precio: 0,
        nombre: "",
        vendidos: 0
    })

    const [textBusqueda, setTextBusqueda] = useState<string>("")
    const [cantidad, setCantidad] = useState<number>(0)

    const [vistaListaProducto, setVistaListaProducto] = useState<boolean>(false)
    const [vistaCarrito, setVistaCarrito] = useState<boolean>(false)
    const busquedaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        calculador()
    }, [prtsPorVender])

    const calculador = () => {
        let valor: number = 0;
        let cantidadV: number = 0;

        prtsPorVender.map(n => {
            valor += (n.precio * n.vendidos)
            cantidadV += n.vendidos
        })

        setCantidadPV(cantidadV)
        setPrecioT(valor)
    }

    useEffect(() => {
        obtenerProductos()
    }, [])

    const obtenerProductos = async () => {
        //const aux = await GetAllProducto()
        const aux: Producto[] = [
            {
                id: "1",
                precio: 200,
                nombre: "Coca 1L",
                vendidos: 10
            },
            {
                id: "2",
                precio: 110,
                nombre: "Pepsi 1L",
                vendidos: 5
            },
            {
                id: "3",
                precio: 150,
                nombre: "SevenUp 1L",
                vendidos: 1
            },
            {
                id: "4",
                precio: 100,
                nombre: "Spreet 1L",
                vendidos: 1
            }
        ]
        if (!aux) return
        //@ts-ignore
        const addProductos: Producto[] = aux.map(n => {
            n?.id,
                n.vendidos = 0,
                n?.precio,
                n?.nombre
        }
        );

        setProdUsar(addProductos);
        setProd(aux);
    }

    const Busqueda = (text: string) => {
        setTextBusqueda(text)
        setVistaListaProducto(text !== "" ? true : false)

        setProdUsar(prod.filter(m => m.nombre.toLowerCase().includes(text.toLowerCase())));
    }

    const validarACarrito = () => {
        return prodSelect.vendidos !== undefined && prodSelect.nombre !== "" && cantidad > 0
    }

    const AgregarACarrito = () => {
        if (!validarACarrito()) return;
        let esta = false;

        setPrtsPorVender(prtsPorVender.map(n => {
            if (n.nombre === prodSelect.nombre) {
                n.vendidos += cantidad;
                esta = true;
            }
            return n;
        }))

        if (!esta) {
            prodSelect.vendidos = cantidad;
            setPrtsPorVender(n => [...n, prodSelect]);
        }

        cleanAgregar();
        busquedaRef.current?.focus();
    }

    const realizarVenta = () => {
        let newVenta: Venta = {
            fecha: "",
            cantidadPV,
            precioT
        }

        cleanGlobal();
    }

    const cleanAgregar = () => {
        setProdSelect({
            precio: 0,
            nombre: "",
            vendidos: 0
        })
        setCantidad(0)
        setTextBusqueda("")
    }

    const cleanGlobal = () => {
        cleanAgregar();
        setPrtsPorVender([])
        setCantidadPV(0)
        setPrecioT(0)
    }

    return (
        <main className="w-full min-h-[90vh] bg-gris_claro">
            <div className='w-full h-[70px] flex justify-center items-center'>
                <h1 className="text-2xl font-black">Ventas</h1>
            </div>
            <form className='w-full h-auto flex flex-col items-center gap-5 mt-5'>
                <div className='w-full h-auto flex justify-center items-center'>
                    <input
                        ref={busquedaRef}
                        type="text"
                        value={textBusqueda}
                        placeholder='Busqueda'
                        className='text-lg w-[90%] md:w-[50%] p-2 rounded-t-sm border-b border-black'
                        onChange={e => Busqueda(e.target.value)}
                    />
                </div>
                {prodUsar && <ListaProductos
                    setVista={setVistaListaProducto}
                    vista={vistaListaProducto}
                    productos={prodUsar}
                    productoSelect={prodSelect}
                    setProductoSelect={setProdSelect}
                />}
                <div className='w-full h-[100px] flex justify-center items-center mt-8'>
                    <input
                        className="text-lg w-[90%] md:w-[50%] text-end p-2 rounded-t-sm border-b border-black"
                        type="number"
                        value={cantidad === 0 ? "" : cantidad}
                        onChange={e => {
                            //@ts-ignore
                            e.nativeEvent.data === undefined
                                ? ""
                                : setCantidad(Number(e.target.value))
                        }}
                        placeholder="Cantidad"
                    />
                </div>
                <div className='w-full h-[50px] flex justify-center items-center'>
                    <button
                        type="button"
                        className='bg-azul w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg'
                        onKeyDown={e => {
                            e.key === 'Enter'
                                ? AgregarACarrito()
                                : "";
                        }}
                        onClick={e => { e.preventDefault(); AgregarACarrito() }}
                    >
                        Agregar
                    </button>
                </div>
            </form>
            <div className='w-full bg-red h-auto flex justify-center items-center mt-10'>
                <ListaCarrito
                    precioT={precioT}
                    setVista={setVistaCarrito}
                    vista={vistaCarrito}
                    productos={prtsPorVender}
                    setProductos={setPrtsPorVender}
                />
            </div>
            <div className='w-full bg-red h-auto flex flex-col justify-center items-center mt-4 mb-16 gap-10 md:gap-4'>
                <button 
                    className="bg-green-600 w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg" 
                    type="button"
                    onClick={e => {e.preventDefault(); realizarVenta()}}
                >Finalizar Venta</button>
                <button
                    className="bg-rojo w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg"
                    type="button"
                    onClick={e => { e.preventDefault(); cleanGlobal() }}
                >Limpiar</button>
            </div>
        </main>
    )
}

interface PropsLista {
    setVista: React.Dispatch<React.SetStateAction<boolean>>
    vista: boolean
    setProductoSelect?: React.Dispatch<React.SetStateAction<Producto>>
    productoSelect?: Producto
    productos: Producto[]
    setProductos?: React.Dispatch<React.SetStateAction<Producto[]>>
    precioT?: number
}

export const ListaProductos = ({ setVista, vista, productos, productoSelect, setProductoSelect }: PropsLista) => {
    const Seleccionar = (n: Producto) => {
        setVista(false);
        if (setProductoSelect) setProductoSelect(n);
    }

    return (
        <ul className={`${vista ? "shadow-lg shadow-black" : ""} z-10 absolute mt-14 flex flex-col items-center text-lg w-[90%] md:w-[50%] p-4 mb-12 rounded-b-md  gap-2 max-h-[60vh] min-h-[50px] overflow-y-scroll overflow-x-hidden transition-all duration-100 ease-linear bg-gris_claro`}>
            <li className='absolute w-full px-4 h-[40px] gap-5 flex justify-start items-center rounded-sm'>
                <button
                    tabIndex={-1}
                    type="button"
                    className={`hover:cursor-pointer transition-all duration-100 ease-linear ${vista && "rotate-180"}`}
                    onClick={e => { e.preventDefault(); setVista(n => !n) }}
                >
                    <FlechaArriba />
                </button>
                {productoSelect && <p>{productoSelect.nombre}</p>}
            </li>
            {vista && productos.map((n, i) =>
                <li className={`
                    py-2 px-5 w-full
                    ${vista ? "flex opacity-100 z-10 hover:opacity-75 hover:cursor-pointer" : "-z-10 opacity-0 hover:cursor-auto"} 
                    ${i === 0 && "mt-12"} 
                  bg-white flex justify-between items-center rounded-sm
                    border border-black hover:bg-gris_claro
                    transition-all duration-100 ease-in-out
                    text-sm md:text-base
                `}
                    key={n.id}
                    tabIndex={1}
                    onClick={e => { e.preventDefault(); Seleccionar(n) }}
                    onKeyDown={e => {
                        e.preventDefault();
                        e.key === 'Enter'
                            ? Seleccionar(n)
                            : () => { };
                    }}
                >
                    <p className='w-full text-justify me-5 truncate'>
                        {n.nombre}
                    </p>
                    <p className='w-[100px]'>
                        ${n.precio}
                    </p>
                </li>
            )}
        </ul>
    )
}

export const ListaCarrito = ({ productos , setProductos , precioT }: PropsLista) => {
    const sacarDelCarro = (id:string) => {
        if(id === "") return;
        //@ts-ignore
        setProductos(n => n.filter(m => m.id !== id))
    }

    return (
        <div className='flex flex-col items-center w-full h-auto mb-12'>
            <ul className='flex flex-col items-center text-lg w-[100%] border-t border-black p-4 gap-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden'>
                {productos.map((n, i) =>
                    <li className={`
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        key={n.id}
                        onClick={e => { e.preventDefault(); }}
                    >
                        <p className='w-[80%] text-justify me-5 truncate'>
                            {n.nombre}
                        </p>
                        <p className='w-[100px]'>
                            {n.vendidos}
                        </p>
                        <p className='w-[100px]'>
                            ${n.precio * n.vendidos}
                        </p>
                        <button 
                            className='h-full w-[30px] ms-5 hover:opacity-75 hover:cursor-pointer'
                            onClick={e => {e.preventDefault() ; sacarDelCarro(n.id ? n.id : "")}}
                        >
                            {/* @ts-ignore */}
                            <Remove className="h-full w-full" />
                        </button>
                    </li>
                )}
            </ul>
            <div className={`
                        py-2 px-9 w-full
                        flex bg-green-500 justify-between items-center
                        border-y border-black
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