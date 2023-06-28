import FondoOscuro from "./fondoOscuro"
import Close from "../svg/close.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

interface props {
    cartel:string
    setCartel:React.Dispatch<React.SetStateAction<string>>
}

export default function CartelProducto({cartel , setCartel}:props) {
    const refEditar = useRef<HTMLButtonElement>(null)
    const refEliminar = useRef<HTMLButtonElement>(null)
    const refCerrar = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        refEditar.current?.focus()
    } , [])

    const tabFocus = (e:any) => {
        if(e?.key !== "Tab") return; 
        let accion:string = e.target.id;

        if(accion === "btnClose") {
            e.preventDefault();
            refEditar.current?.focus();
        }
        else if(accion === "btnEditar") {
            e.preventDefault();
            refEliminar.current?.focus();
        }
        else if(accion === "btnEliminar") {
            e.preventDefault();
            refCerrar.current?.focus();
        }
    }
    
    return (
        <>
            <FondoOscuro vista={cartel !== ""} />
            <div className={`
                ${cartel === "" ? "hidden" : "flex"} 
                absolute z-[100] top-[35%] right-[5%] md:right-[25%] bg-verde h-[25%] w-[90%] md:w-[50%]
                flex flex-col justify-center items-center rounded-lg shadow-md shadow-black`
            }>
                <button 
                    tabIndex={1}
                    ref={refCerrar}
                    className="absolute top-0 right-0 mt-2 me-3" 
                    onClick={e => {e.preventDefault() ; setCartel("")}}
                    onKeyDown={e => {tabFocus(e)}}
                    id="btnClose"
                >
                    {/* @ts-ignore */}
                    <Close className="h-[30px]" />
                </button>
                <h3 className="text-2xl">Acciones</h3>
                <span className="min-h-[70px] w-[90%] md:w-[65%] flex justify-between items-center mt-2">
                    <button 
                        tabIndex={1}
                        ref={refEditar}
                        className="min-w-[125px] h-[50px] bg-azul rounded-md border border-black text-lg text-black hover:opacity-70 focus:opacity-70"
                        onClick={e => {e.preventDefault(); navigate(`/Productos/Acciones/${cartel}`)}}
                        onKeyDown={e => {tabFocus(e)}}
                        id="btnEditar"
                    >
                            Editar
                    </button>
                    <button 
                        tabIndex={1}
                        ref={refEliminar}
                        className="min-w-[125px] h-[50px] bg-rojo rounded-md border border-black text-lg text-black hover:opacity-70 focus:opacity-70"
                        onClick={e => {e.preventDefault(); console.log("eliminar")}}
                        onKeyDown={e => {tabFocus(e)}}
                        id="btnEliminar"
                    >
                        Eliminar
                    </button>
                </span>
            
            </div>
        </>
    )
}