import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetAllVenta } from '../../functions/ventas'

export default function Ajustes(){
    const navigate = useNavigate()
    const [contrasenia , setContrasenia] = useState<string>("")
    const clave = "adelante...123"

    //@ts-ignore
    const volverAMain = () => setTimeout( navigate('/') , 3000)

    return (
        <main className="bg-gris_claro min-h-[500px] h-[90vh] max-h-[90vh] w-full flex flex-col justify-center items-center">
            <h1>Proximamente</h1>
            {/*<div className="flex flex-col mb-8">
                <form className="flex flex-col">
                    <label className='me-4 text-ls w-[100px]' htmlFor="contrasenia">Clave</label>
                    <input
                        className='p-2 text-ls w-[300px]'
                        value={contrasenia} 
                        type="password"
                        onChange={e => setContrasenia(e.target.value)} 
                    />
                    <div className='h-[170px] w-[100px] mt-5 flex flex-col'>
                        <label>Borrar</label>
                        <span className='flex flex-col w-[300px] bg-white py-2'>
                            <div className="w-full flex my-1 mx-4">
                                <label className="w-[100px] text-lg">Todo</label>
                                <input className='w-[18px]' type="radio" value="Todo" name="Borrar" id="Todo" />
                            </div>
                            <div className="w-full flex my-1 mx-4">
                                <label className="w-[100px] text-lg">Ventas</label>
                                <input className='w-[18px]' type="radio" value="Ventas" name="Borrar" id="Ventas" />
                            </div>
                            <div className="w-full flex my-1 mx-4">
                                <label className="w-[100px] text-lg">Productos</label>
                                <input className='w-[18px]' type="radio" value="Productos" name="Borrar" id="Productos" />
                            </div>
                        </span>
                    </div>
                </form>
            </div>
            <div className="">
                <button 
                    disabled={contrasenia !== clave} 
                    className="w-[200px] py-2 bg-rojo text-white rounded-xl"
                    onClick={e => {e.preventDefault();
                    volverAMain() }}
                >    
                    Reset
                </button>
            </div>*/}
        </main>
    )
}