import { Producto } from "../types";

export const getAllProducto = async () => {
  try {
    let info: Producto[] = [];
    await fetch(import.meta.env.VITE_URL + "productos")
      .then((response) => response.json())
      .then((data) => {
        info = data;
      })
      .catch((error) => console.error(error));

    return info;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getProducto = async (id: string) => {
  let datos: Producto = {
    precio: 0,
    nombre: "",
    vendidos: 0,
  };

  try {
    await fetch(import.meta.env.VITE_URL + "productos/" + id)
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  } catch (error) {
    console.error(error);
    return;
  }

  return datos;
};

export const updateProducto = async (prod: Producto) => {
  const datos = JSON.stringify({
    clave: import.meta.env.VITE_CLAVE,
    id: prod?.id,
    precio: prod?.precio,
    nombre: prod?.nombre,
    vendidos: prod?.vendidos,
  });

  let respuesta:any = false; 
  try{
    respuesta = await fetch(
      import.meta.env.VITE_URL + "productos/u/" + prod?.id,
      {
        body: datos,
        method: "POST",
      }
    )
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  }catch(error) {
    console.error(error)
    return;
  }

  return respuesta;
};

export const createProducto = async (prod: Producto) => {
  const datos = JSON.stringify({
    clave: import.meta.env.VITE_CLAVE,
    precio: prod?.precio,
    nombre: prod?.nombre,
  });

  let respuesta:any = false;
  try{
    respuesta = await fetch(import.meta.env.VITE_URL + "productos/c/", {
      body: datos,
      method: "POST",
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  }catch(error) {
    console.error(error)
    return;
  }

  return respuesta;
};

export const deleteProducto = async (id: string) => {
  let respuesta:any = false;

  try{
    respuesta = await fetch(import.meta.env.VITE_URL + "productos/d/" + id, {
      body: JSON.stringify({
        clave: import.meta.env.VITE_CLAVE,
      }),
      method: "POST",
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error al realizar la solicitud: ", error);
      });
  }catch(error) {
    console.error(error)
    return;
  }

  return respuesta;
};
