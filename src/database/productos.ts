import { Producto } from "../types";

export const getAllProducto = async () => {
  let datos: Producto[] = [];
  await fetch(import.meta.env.VITE_URL + "ventas")
    .then((response) => response.json)
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error al realizar la solicitud: ", error);
    });

  return datos;
};

export const getProducto = async (id:string) => {
    let datos: Producto = {
        precio:0,
        nombre:"",
        vendidos:0
    };
    await fetch(import.meta.env.VITE_URL + "ventas/" + id)
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  
    return datos;
};

export const updateProducto = async (prod:Producto) => {
    const datos = JSON.stringify({
        clave: import.meta.env.VITE_CLAVE,
        id:prod?.id,
        precio:prod?.precio,
        nombre:prod?.nombre,
        vendidos:prod?.vendidos
    })
    
    const respuesta = await fetch(import.meta.env.VITE_URL + "productos/" + prod?.id ,{
        body: datos,
        method: "PUT",
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  
    return respuesta;
};

export const createProducto = async (prod:Producto) => {
    const datos = JSON.stringify({
        clave: import.meta.env.VITE_CLAVE,
        precio:prod?.precio,
        nombre:prod?.nombre,
        vendidos:prod?.vendidos
    })
    
    const respuesta = await fetch(import.meta.env.VITE_URL + "productos/" ,{
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

export const deleteProducto = async (id:string) => {
    const respuesta = await fetch(import.meta.env.VITE_URL + "productos/" + id ,{
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
