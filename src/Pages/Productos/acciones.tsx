import { useEffect , useState } from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import Productos, { Producto } from "../../types"
import { Link } from "react-router-dom";
import { CreateProducto, GetProducto, UpdateProducto } from "../../functions/productos";
import { CartelExpressSucess ,CartelExpressError, CartelExpressInfo } from '../../components/carteles'

export default function AccionesProducto(){
    const navigate = useNavigate();
    const id_producto:string = useLocation().pathname.split('/')[3].toString();
    const [nombre , setNombre] = useState<string>('')
    const [precio , setPrecio] = useState<number>(0)
    const [productoEdit , setProductoEdit] = useState<Producto>({
        id: "0",
        precio: 0,
        nombre: "",
        vendidos: 0,
    })

    useEffect(() => {
        comprobarId();
        if(id_producto !== "") obtenerData(id_producto)
    },[])

    const comprobarId = () => {
        if(typeof id_producto !== 'string') {
            navigate("/")
        }
    }

    const comprobarPeticion = () => {
        let textMensaje = "";
        
        if(precio <= 0){
            textMensaje = "El Precio tiene que ser mayor a 0. \n"
            CartelExpressInfo({text:textMensaje , time: 5000 , className: "w-[100vw] md:w-[80vw] text-center" , position: "top-left"});
        }
        if(nombre.length <= 0 || nombre.length >= 40){
            textMensaje = "El Nombre tiene que que tener entre 0 y 40 caracteres. "
            CartelExpressInfo({text:textMensaje , time: 5000 , className: "w-[100vw] md:w-[80vw] text-center" , position: "top-left"});
        }

        return textMensaje === "";
    }

    const obtenerData = (id:string) => {
        const producto:Producto | undefined = GetProducto(id);
        if(producto){
            setNombre(producto.nombre)
            setPrecio(producto.precio)
            setProductoEdit(producto);
        } 
    }

    const agregar = () => {
        if(!comprobarPeticion()) return;
        const newProducto:Producto = {
            precio,
            nombre,
            vendidos: 0
        }
        
        CreateProducto(newProducto);
        clean();
        CartelExpressSucess({text:"Agregado con Exito!"})
    }

    const editar = () => {
        if(!comprobarPeticion()) return;
        const newProducto:Producto = {
            id: productoEdit.id,
            precio,
            nombre,
            vendidos: productoEdit.vendidos
        }
        
        UpdateProducto(newProducto);
        CartelExpressSucess({text:"Editado con Exito!"})
        navigate("/Productos")
    }
    
    const clean = () => {
        setNombre("")
        setPrecio(0)
    }

    return (
        <main className="bg-gris_claro min-h-[500px] h-[90vh] max-h-[90vh] w-full flex flex-col items-center">
            <div className="h-[10%] md:h-[15%] w-full flex justify-center items-center">
                <h1 className="text-2xl">{id_producto === "" ? 'Agregar' : "Editar"} Producto</h1>
            </div>
            <div className="h-[80%] md:h-[85%] mt-[10%] md:mt-0 w-full flex flex-col items-center">
                <form className="w-[90%] md:w-[40%] h-[80%] mx-[5%] flex flex-col items-center justify-between">
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
                    <button 
                        className="w-[200px] p-2 bg-green-500 text-white rounded-md"
                        onClick={e => {e.preventDefault(); id_producto === "" ? agregar() : editar()}}
                    >
                        {id_producto === "" ? 'Agregar' : "Editar"}
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