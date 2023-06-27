import FondoOscuro from "./fondoOscuro"
import Close from "../svg/close.svg"
import { useNavigate } from "react-router-dom";

interface props {
    cartel:string
    setCartel:React.Dispatch<React.SetStateAction<string>>
}

export default function CartelProducto({cartel , setCartel}:props) {
    const navigate = useNavigate();
    
    return (
        <>
            <FondoOscuro vista={cartel !== ""} />
            <div className={`
                ${cartel === "" ? "hidden" : "flex"} 
                absolute top-[35%] right-[5%] md:right-[25%] bg-verde h-[25%] w-[90%] md:w-[50%]
                flex flex-col justify-center items-center rounded-lg shadow-md shadow-black`
            }>
                <button className="absolute top-0 right-0 mt-2 me-3" onClick={e => {e.preventDefault() ; setCartel("")}}>
                    {/* @ts-ignore */}
                    <Close className="h-[30px]" />
                </button>
                <h3 className="text-2xl">Acciones</h3>
                <span className="min-h-[70px] w-[90%] md:w-[65%] flex justify-between items-center mt-2">
                    <button 
                        className="min-w-[125px] h-[50px] bg-azul rounded-md border border-black text-lg text-black"
                        onClick={e => {e.preventDefault(); navigate(`/Productos/Acciones/${cartel}`)}}
                    >
                            Editar
                    </button>
                    <button 
                        className="min-w-[125px] h-[50px] bg-rojo rounded-md border border-black text-lg text-black"
                        onClick={e => {e.preventDefault(); console.log("eliminar")}}
                    >
                        Eliminar
                    </button>
                </span>
            
            </div>
        </>
    )
}