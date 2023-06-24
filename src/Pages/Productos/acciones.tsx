import { useEffect , useState } from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import Productos from "../../types"
import { Link } from "react-router-dom";
//import {comprobarNombre, mostrarProductoId, crearProducto , editarProducto } from "../../database/productos"

export default function AccionesProducto(){
    const navigate = useNavigate();
    const id_producto:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [precio , setPrecio] = useState<number>(0)
    const [estadoDelInput, setEstadoDelInput] = useState<boolean>(id_producto === 0 ? false : true)

    useEffect(() => {
        comprobarId();
        //if(nombre === "") obtenerData(id_producto)
    },[])

    const comprobarId = () => {
        if(!isNaN(id_producto) && !Number(id_producto)) {
            navigate("/")
        }
    }


    const comprobarEstadoBtn = async(nombreTarget:string) => {
        //const aux = await comprobarNombre(nombreTarget , id)
        //setEstadoDelInput(aux)
    }

    //const obtenerData = async (id:number) => {
    //    //const aux:InterProductos[] = await mostrarProductoId(id);
    //    //setNombre(aux[0].nombre)
    //    //setPrecio(aux[0].precio)
    //    //setVendidos(aux[0].vendidos)
    //}
    
    const crear = () => {
        //crearProducto(nombre , precio)
        setNombre("")
        setPrecio(0)
    }

    return (
        <main className="bg-gris_claro min-h-[500px] h-[90vh] w-full flex flex-col items-center">
            <div className="h-[10%] md:h-[15%] w-full flex justify-center items-center">
                <h1 className="text-2xl">{isNaN(id_producto) ? 'Agregar' : "Editar"} Producto</h1>
            </div>
            <div className="h-[80%] md:h-[85%] mt-[10%] md:mt-0 w-full flex flex-col items-center">
                <form className="w-[90%] h-[80%] mx-[5%] flex flex-col items-center justify-between">
                    <div className="w-[100%] flex flex-col items-center">
                        <div className="w-[90%] flex flex-col p-2">
                            <label className="text-xl">Nombre</label>
                            <input 
                                className="text-xl p-2 border-b border-black"
                                type="text" 
                                value={nombre} 
                                onChange={e => setNombre(e.target.value)} 
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="w-[90%] flex flex-col p-2">
                            <label className="text-xl">Precio</label>
                            <input 
                                className="text-xl text-end p-2 border-b border-black"
                                type="number" 
                                value={precio} 
                                onChange={e => {
                                    //@ts-ignore
                                    e.nativeEvent.data === undefined
                                    ? "" 
                                    : setPrecio(Number(e.target.value))
                                }} 
                                placeholder="Precio"
                            />
                        </div>
                    </div>
                    <button className="w-[200px] p-2 bg-green-500 text-white rounded-md">
                        {isNaN(id_producto) ? 'Agregar' : "Editar"}
                    </button>
                </form>
                <div className="w-[90%] h-[20%] mx-[5%] flex justify-center items-center">
                    <Link to="/Productos" className="flex justify-center items-center w-[200px] p-2 bg-azul text-white rounded-md">
                        Volver
                    </Link>
                </div>
            </div>
        </main>
    )
}