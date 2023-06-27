import { useEffect, useRef, useState } from 'react'
//import { InterProductos , } from "../../types."
//import TablaVentas from '../../components/tabla';
//import { mostrarTodosLosProductos , mostrarProductoNombre} from '../../database/productos'
//import { AgreProducto } from '../../functions/productos'
//import { RealizarVenta } from '../../functions/ventas'
import { Bounce, toast } from 'react-toastify'
import FlechaArriba from "../../svg/flechaArriba.svg"
import Remove from "../../svg/delete.svg"

export default function Ventas() {
    const [total, setTotal] = useState<number[]>([0, 0])
    //const [prtsPorVender , setPrtsPorVender] = useState<InterProductos[]>([])
    //const [elementos , setElementos] = useState<InterProductos[]>([])
    //const [eleSelc , setEleSelc] = useState<InterProductos>({
    //    id:0,
    //    nombre:'',
    //    precio:0,
    //    vendidos:0
    //})

    //useEffect(() => {
    //    cargaDeElementos()
    //},[])

    //const cargaDeElementos = async () => {
    //    const aux = await mostrarTodosLosProductos()
    //    setElementos([eleSelc , ...aux])
    //}

    //const ObtenerEleSelc = async (nombre:string) => {
    //    if(nombre === undefined) return
    //    const aux = await mostrarProductoNombre(nombre)
    //    setEleSelc(aux)
    //}

    //const limpiar = () => {
    //    setTotal([0,0])
    //    setPrtsPorVender([])
    //}
    const [prod, setProd] = useState<string[]>(["1", "2", "3", "4", "50000", "1", "2", "3", "4", "50000"])
    const [prodSelect, setProdSelect] = useState<string>("")
    const [textBusqueda, setTextBusqueda] = useState<string>("")
    const [cantidad, setCantidad] = useState<number>(0)
    const [vistaListaProducto, setVistaListaProducto] = useState<boolean>(false)
    const [vistaCarrito, setVistaCarrito] = useState<boolean>(false)

    const Busqueda = (text: string) => {
        setTextBusqueda(text)
        setVistaListaProducto(text !== "" ? true : false)
    }

    return (
        <main className="w-full min-h-[90vh] bg-gris_claro">
            <div className='w-full h-[70px] flex justify-center items-center'>
                <h1 className="text-2xl font-black">Ventas</h1>
            </div>
            <form className='w-full h-auto flex flex-col items-center gap-5 mt-5'>
                <div className='w-full h-auto flex justify-center items-center'>
                    <input
                        type="text"
                        placeholder='Busqueda'
                        className='text-lg w-[90%] md:w-[50%] p-2 rounded-t-sm border-b border-black'
                        onChange={e => Busqueda(e.target.value)}
                    />
                </div>
                <ListaProductos
                    setVista={setVistaListaProducto}
                    vista={vistaListaProducto}
                    productos={prod}
                    productoSelect={prodSelect}
                    setProductoSelect={setProdSelect}
                />
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
                    <button type="button" className='bg-azul w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg'>
                        Agregar
                    </button>
                </div>
            </form>
            <div className='w-full bg-red h-auto flex justify-center items-center mt-10'>
                <ListaCarrito
                    setVista={setVistaCarrito}
                    vista={vistaCarrito}
                    productos={prod}
                />
            </div>
            <div className='w-full bg-red h-auto flex flex-col justify-center items-center mt-4 mb-16 gap-10 md:gap-4'>
                <button className="bg-green-600 w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg" type="button">Finalizar Venta</button>
                <button className="bg-rojo w-[90%] md:w-[50%] py-3 rounded-md text-white text-lg" type="button">Limpiar</button>
            </div>
        </main>
    )
}

interface PropsLista {
    setVista: React.Dispatch<React.SetStateAction<boolean>>
    vista: boolean
    setProductoSelect?: React.Dispatch<React.SetStateAction<string>>
    productoSelect?: string
    productos: string[]
}

export const ListaProductos = ({ setVista, vista, productos, productoSelect, setProductoSelect }: PropsLista) => {
    const Seleccionar = (n: string) => {
        setVista(false);
        if (setProductoSelect) setProductoSelect(n);
    }

    return (
        <ul className={`${vista ? "shadow-lg shadow-black" : ""} z-10 absolute mt-14 flex flex-col items-center text-lg w-[90%] md:w-[50%] p-4 mb-12 rounded-b-md  gap-2 max-h-[60vh] min-h-[50px] overflow-y-scroll overflow-x-hidden transition-all duration-100 ease-linear bg-gris_claro`}>
            <li className='absolute w-full px-4 h-[40px] gap-5 flex justify-start items-center rounded-sm'>
                <button
                    type="button"
                    className={`hover:cursor-pointer transition-all duration-100 ease-linear ${vista && "rotate-180"}`}
                    onClick={e => { e.preventDefault(); setVista(n => !n) }}
                >
                    <FlechaArriba />
                </button>
                {productoSelect && <p>{productoSelect}</p>}
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
                    onClick={e => { e.preventDefault(); Seleccionar(n !== undefined ? n : "Nada") }}
                >
                    <p className='w-full text-justify me-5 truncate'>
                        asdasdasdasdas asdbuasvbduasd ausdb
                    </p>
                    <p className='w-[100px]'>
                        ${n}
                    </p>
                </li>
            )}
        </ul>
    )
}

export const ListaCarrito = ({ productos }: PropsLista) => {
    return (
        <div className='flex flex-col items-center w-full h-auto mb-12'>
            <ul className='flex flex-col items-center text-lg w-[100%] border-t border-black p-4 gap-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden'>
                {productos.map((n, i) =>
                    <li className={`
                        py-2 px-5 w-full flex bg-white justify-between items-center text-sm md:text-base
                    `}
                        onClick={e => { e.preventDefault(); }}
                    >
                        <p className='w-[80%] text-justify me-5 truncate'>
                            asdasdasdasdas 
                        </p>
                        <p className='w-[100px]'>
                            {n}
                        </p>
                        <p className='w-[100px]'>
                            ${n}
                        </p>
                        <button className='h-full w-[30px] ms-5 hover:opacity-75 hover:cursor-pointer'>
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
                    $100000
                </p>
            </div>
        </div>
    )
}