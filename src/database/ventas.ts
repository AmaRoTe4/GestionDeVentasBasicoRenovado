import { Venta } from "../types";

export const getAllVenta = async () => {
  let datos: Venta[] = [];
  await fetch(import.meta.env.VITE_URL + "ventas")
    .then((response) => response.json)
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error al realizar la solicitud: ", error);
    });

  return datos;
};

export const createVenta = async (venta:Venta) => {
    const datos = JSON.stringify({
        clave: import.meta.env.VITE_CLAVE,
        cantidadPV:Number(venta.cantidadPV),
        precioT: Number(venta.precioT),
    })
    
    const respuesta = await fetch(import.meta.env.VITE_URL + "ventas/" ,{
        body: datos,
        method: "POST",
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  
    return respuesta;
};

export const deleteVenta = async (id:string) => {    
    const respuesta = await fetch(import.meta.env.VITE_URL + "ventas/" + id ,{
        body: JSON.stringify({
            clave: import.meta.env.VITE_CLAVE
        }),
        method: "DELETE",
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  
    return respuesta;
};
