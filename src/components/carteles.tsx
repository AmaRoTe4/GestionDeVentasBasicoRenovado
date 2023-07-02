import FondoOscuro from "./fondoOscuro"
import Close from "../svg/close.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { DeleteAllProducto, DeleteProducto } from "../functions/productos";
import { ToastContainer, ToastPosition, toast } from "react-toastify"
import { DeleteAllVenta } from "../functions/ventas";

interface propsExpress{
    text:string;
    time?:number;
    style?: object;
    className?: string;
    position?:ToastPosition
}

export const CartelExpressSucess = ({text , time = 2000 , style={} , className="" ,position="top-center"}:propsExpress) => {
    toast.success(text, {
        className:className,
        style:style,
        position: position,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const CartelExpressInfo = ({text , time = 2000 , style={} , className="" ,position="top-center"}:propsExpress) => {
    toast.info(text, {
        className:className,
        style:style,
        position: position,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const CartelExpressError = ({text = "Error de Conexion" , time = 2000 , style={} , className="" ,position="top-center"}:propsExpress) => {
    toast.error(text, {
        className:className,
        style:style,
        position: position,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

interface propsCP {
    cartel: string
    setCartel: React.Dispatch<React.SetStateAction<string>>
}

export function CartelProducto({ cartel, setCartel }: propsCP) {
    const refEditar = useRef<HTMLButtonElement>(null)
    const refEliminar = useRef<HTMLButtonElement>(null)
    const refCerrar = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        refEditar.current?.focus()
    }, [])

    const tabFocus = (e: any) => {
        if (e?.key !== "Tab") return;
        let accion: string = e.target.id;

        if (accion === "btnClose") {
            e.preventDefault();
            refEditar.current?.focus();
        }
        else if (accion === "btnEditar") {
            e.preventDefault();
            refEliminar.current?.focus();
        }
        else if (accion === "btnEliminar") {
            e.preventDefault();
            refCerrar.current?.focus();
        }
    }

    const borrarProducto = () => {
        if (cartel === "") return;
        DeleteProducto(cartel)
        setCartel("")
        setTimeout(() => {
            navigate("/Productos")
        }, 100)
    }

    return (
        <>
            <FondoOscuro vista={cartel !== ""} />
            <div className={`
                ${cartel === "" ? "opacity-0 -z-10 translate-y-0" : "translate-y-[35vh] opacity-100"} 
                absolute z-[100] right-[5%] md:right-[25%] bg-blue-300 h-[25%] w-[90%] md:w-[50%]
                flex flex-col justify-center items-center rounded-lg shadow-md shadow-black transition-all duration-100 ease-linear`
            }>
                <button
                    tabIndex={1}
                    ref={refCerrar}
                    className="absolute top-0 right-0 mt-2 me-3"
                    onClick={e => { e.preventDefault(); setCartel("") }}
                    onKeyDown={e => { tabFocus(e) }}
                    id="btnClose"
                >
                    {/* @ts-ignore */}
                    <Close className="h-[30px]" style={{ fill: "#000000" }} />
                </button>
                <h3 className="text-2xl">Acciones</h3>
                <span className="min-h-[70px] w-[90%] md:w-[65%] flex justify-between items-center mt-2">
                    <button
                        tabIndex={1}
                        ref={refEditar}
                        className="min-w-[125px] h-[50px] bg-azul rounded-md text-white text-lg hover:opacity-70 focus:opacity-70"
                        onClick={e => { e.preventDefault(); navigate(`/Productos/Acciones/${cartel}`) }}
                        onKeyDown={e => { tabFocus(e) }}
                        id="btnEditar"
                    >
                        Editar
                    </button>
                    <button
                        tabIndex={1}
                        ref={refEliminar}
                        className="min-w-[125px] h-[50px] bg-rojo rounded-md text-white text-lg hover:opacity-70 focus:opacity-70"
                        onClick={e => { e.preventDefault(); borrarProducto() }}
                        onKeyDown={e => { tabFocus(e) }}
                        id="btnEliminar"
                    >
                        Eliminar
                    </button>
                </span>

            </div>
        </>
    )
}

type TypeOfPoster = 1 | 2

interface propsCBAP {
    condicion: boolean;
    setCondicion: React.Dispatch<React.SetStateAction<boolean>>
    type: TypeOfPoster;
}

export function CartelBorrarAll({ condicion, setCondicion , type }: propsCBAP) {
    const refEliminar = useRef<HTMLButtonElement>(null)
    const refCerrar = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        refCerrar.current?.focus()
    }, [])

    const tabFocus = (e: any) => {
        let accion: string = e.target.id;
        if(e?.key === "enter") {
            if(accion === "btnEliminar") borrarProducto(); 
            else if(accion === "btnClose") setCondicion(true); 
            return
        }if (e?.key !== "Tab") return;

        if (accion === "btnClose") {
            e.preventDefault();
            refEliminar.current?.focus();
        }
        else if (accion === "btnEliminar") {
            e.preventDefault();
            refCerrar.current?.focus();
        }
    }

    const borrarProducto = () => {
        if (!condicion) return;
        if(type === 1) DeleteAllProducto()
        if(type === 2) DeleteAllVenta()
    }

    return (
        <>
            <FondoOscuro vista={condicion} />
            <div className={` 
                ${!condicion ? "opacity-0 -z-10 translate-y-0" : "translate-y-[35vh] opacity-100"}
                absolute z-[100] right-[5%] md:right-[25%] bg-blue-300 h-[25%] w-[90%] md:w-[60%]
                flex flex-col justify-center items-center rounded-lg shadow-md shadow-black transition-all duration-100 ease-linear`
            }>
                <h3 className="text-2xl text-center text-black">Estas seguro de que quieres Borrar todos {type === 1 ? "los productos" : "las ventas"}?</h3>
                <span className="min-h-[70px] w-[90%] md:w-[65%] flex justify-between items-center mt-2">
                    <button
                        tabIndex={1}
                        ref={refEliminar}
                        className="min-w-[125px] h-[50px] bg-rojo rounded-md text-lg text-white hover:opacity-70 focus:opacity-70"
                        onClick={e => { e.preventDefault(); borrarProducto() }}
                        onKeyDown={e => { tabFocus(e) }}
                        id="btnEliminar"
                    >
                        Eliminar
                    </button>
                    <button
                        tabIndex={1}
                        ref={refCerrar}
                        className="min-w-[125px] h-[50px] bg-azul rounded-md text-lg text-white hover:opacity-70 focus:opacity-70"
                        onClick={e => { e.preventDefault(); setCondicion(false) }}
                        onKeyDown={e => { tabFocus(e)}}
                        id="btnClose"
                    >
                        Cancelar
                    </button>
                </span>

            </div>
        </>
    )
}