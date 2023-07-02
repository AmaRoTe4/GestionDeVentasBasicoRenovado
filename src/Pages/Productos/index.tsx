import {useState,useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mas from '../../svg/mas.svg'
import DeleteAll from "../../svg/deleteAll.svg"
import {CartelProducto , CartelBorrarAll} from '../../components/carteles'
import { Producto } from '../../types'
import { GetAllProducto } from '../../functions/productos'

export default function Productos(){
    const [element, setElement] = useState<Producto[]>([])
    const [cartel , setCartel] = useState<string>("")
    const [borrarAll , setBorralAll] = useState<boolean>(false)
    const referenciaDeInicio = useRef<HTMLLIElement>(null)
    const referenciaDeCartel = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        cargaDeElementos()
    },[cartel])

    const cargaDeElementos = () => {
        const aux = GetAllProducto()
        if(aux) setElement(aux)
    }
    
    const reiniciarTab = (e:any) => {
        e.key === "Tab" && referenciaDeInicio.current?.focus()
    }

    const mostrarVista = (id:string , e:any) => {
        e.preventDefault()
        e.target.blur();
        if(id === "") return;
        setCartel(id)
        referenciaDeCartel.current?.focus()
    }

    return (
        <>
            {cartel !== "" && 
                <CartelProducto
                    cartel={cartel} 
                    setCartel={setCartel} 
                />
            }
            {borrarAll && 
                <CartelBorrarAll
                    type={1}
                    condicion={borrarAll} 
                    setCondicion={setBorralAll}
                />
            }
            <main className="bg-gris_claro min-h-[500px] h-[90vh] max-h-[90vh] w-full flex flex-col items-center">
                <div className="h-[10%] w-[90%] flex justify-between items-center">
                    <div className='flex justify-center items-center w-[150px]'></div>
                    <div className='flex justify-center items-center'>
                        <h1 className="text-2xl font-black text-center">Productos</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button 
                            type="button" 
                            className='flex justify-end items-center w-[150px]'
                            onClick={e => {e.preventDefault() ; setBorralAll(true)}}
                        >
                            {/* @ts-ignore */}
                            <DeleteAll className="h-[40px] hover:opacity-70"/>
                        </button>
                    </div>
                </div>
                <ul className="max-h-[90%] w-[100%] md:w-[90%] border-t border-black pt-[20px] px-[20px] pb-[50px] flex justify-center flex-wrap overflow-y-scroll overflox-x-hidden">
                    {element.length > 0 && element.map((n , i) =>
                        <li
                            ref={i === 0 ? referenciaDeInicio : null}
                            tabIndex={1}
                            key={n.id ? n.id : n.nombre} 
                            className="h-[100px] w-[200px] bg-gris_oscuro mb-2 mx-2 rounded-[10px] p-2 flex flex-col justify-center cursor-pointer hover:opacity-70 focus:opacity-70" 
                            onClick={e => {
                                mostrarVista(n.id ? n.id : "" , e)
                            }}
                            onKeyDown={e => {
                                e.key === "Enter" &&
                                mostrarVista(n.id ? n.id : "" , e)
                            }}
                        >
                            <p className="p-0 m-0 text-white text-center text-xl max-w-full text">{n.nombre}</p>
                            <p className="p-0 m-0 text-white text-center text-sm w-full"><span className="text-yellow-500 me-1">$</span>{n.precio}</p>
                        </li>
                    )}
                    <div 
                        className="h-[100px] w-[200px] bg-gris_oscuro mb-3 mx-3 rounded-[10px] p-2 flex flex-col justify-center hover:opacity-70 focus:opacity-70 cursor-pointer"
                        tabIndex={1}
                        onKeyDown={e => reiniciarTab(e)}
                    >
                        <Link 
                            to='Acciones/' 
                            className="h-full w-full flex justify-center items-center"
                        >
                            {/* @ts-ignore */}
                            <Mas className="w-[25px]" />
                        </Link>
                    </div>
                </ul>
            </main>
        </>
    )
}
