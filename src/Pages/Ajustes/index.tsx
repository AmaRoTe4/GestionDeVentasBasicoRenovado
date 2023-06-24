import { useNavigate } from 'react-router-dom'
//import { ResetDataBase } from '../../database/index'
import { useState } from 'react'

export default function Ajustes(){
    const navigate = useNavigate()
    const [contrasenia , setContrasenia] = useState<string>("")
    const clave = "adelante...123"

    //@ts-ignore
    const volverAMain = () => setTimeout( navigate('/') , 3000)

    return (
        <main className="bg-gris_claro min-h-[500px] h-[90vh] w-full flex flex-col justify-center items-center">
            <div className="flex flex-col mb-8">
                <form className="">
                    <label className='me-4 p-2 text-ls' htmlFor="contrasenia">Clave</label>
                    <input
                        className='p-2 text-ls'
                        value={contrasenia} 
                        type="password"
                        onChange={e => setContrasenia(e.target.value)} 
                    />
                </form>
            </div>
            <div className="">
                <button 
                    disabled={contrasenia !== clave} 
                    className="w-[200px] py-2 bg-rojo text-white rounded-xl"
                    onClick={e => {e.preventDefault();
                        //ResetDataBase(); Swal.fire({
                            //title: 'Elinada con Exito!',
                            //icon: 'success',
                            //confirmButtonText: 'Ok',
                        //});
                    volverAMain() }}
                >    
                    Reset
                </button>
            </div>
        </main>
    )
}