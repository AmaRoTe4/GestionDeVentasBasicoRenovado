import { Link } from "react-router-dom";
import ImageMain from "../../images/main.jpg";
import WhatsApp from "../../svg/whatsapp.svg";

export default function Main() {
    return (
        <main className="bg-gris_claro min-h-[500px] h-[90vh] w-full flex flex-col items-center">
            <article className="h-[50%] md:h-[70%] mb-[5%] md:mb-0 w-full flex flex-col">
                <div className="h-[85%] md:h-[100%] w-full flex flex-col md:flex-row md:justify-center md:items-center mt-[15%] md:mt-0">
                    <ul className="h-[100%] md:h-[80%] w-[90%] md:w-[50%] flex flex-col justify-between mx-[5%] md:mx-[5%] md:mt-[10%]">
                        <li>
                            <p className="text-xl md:text-4xl">Creado por Amaro Cattarozzi.</p>
                            <p className="text-xl md:text-4xl">Gracias por tu Confianza!!!</p>
                        </li>
                        <li className="mt-5">
                            <p>Contacto:</p>
                            <p className="flex items-center">
                                <a className="me-2" href="https://web.whatsapp.com" target={'_blank'}>
                                    {/* @ts-ignore */}
                                    <WhatsApp className="w-[15px]" />
                                </a>
                                al: 54 3482650397
                            </p>
                        </li>
                    </ul>
                </div>
            </article>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center h-[30%]">
                <Link
                    className="flex items-center justify-center text-blanco text-2xl min-h-[50px] w-[240px] h-[70px] my-4 md:my-0 md:mx-5 bg-azul rounded-lg hover:opacity-50"
                    to="Productos"
                >
                    Productos
                </Link>
                <Link
                    className="flex items-center justify-center text-blanco text-2xl min-h-[50px] w-[240px] h-[70px] my-4 md:my-0 md:mx-5 bg-azul rounded-lg hover:opacity-50"
                    to="Ventas"
                >
                    Ventas
                </Link>
                <Link
                    className="flex items-center justify-center text-blanco text-2xl min-h-[50px] w-[240px] h-[70px] my-4 md:my-0 md:mx-5 bg-azul rounded-lg hover:opacity-50"
                    to="Totales"
                >
                    Totales
                </Link>
            </div>
        </main>
    )
}