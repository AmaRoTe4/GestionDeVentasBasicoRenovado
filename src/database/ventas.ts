import { Venta } from "../types";

//export const getAllVenta = async () => {
//  let datos: Venta[] = [];

//  try {
//    await fetch(import.meta.env.VITE_URL + "ventas")
//      .then((response) => response.json())
//      .then((data) => {
//        datos = data;
//      })
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  } catch (error) {
//    console.log(error);
//    return;
//  }

//  return datos;
//};

//export const createVenta = async (venta: Venta) => {
//  const datos = JSON.stringify({
//    clave: import.meta.env.VITE_CLAVE,
//    cantidadPV: Number(venta.cantidadPV),
//    precioT: Number(venta.precioT),
//  });

//  let respuesta: any = true;

//  try {
//    respuesta = await fetch(import.meta.env.VITE_URL + "ventas/c/", {
//      body: datos,
//      method: "POST",
//    })
//      .then((response) => response.json)
//      .then((data) => console.log(data))
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  } catch (error) {
//    console.log(error);
//    return;
//  }

//  return respuesta;
//};

//export const deleteVenta = async (id: string) => {
//  let respuesta: any = false;

//  try {
//    respuesta = await fetch(import.meta.env.VITE_URL + "ventas/d/" + id, {
//      body: JSON.stringify({
//        clave: import.meta.env.VITE_CLAVE,
//      }),
//      method: "POST",
//    })
//      .then((response) => response.json)
//      .then((data) => console.log(data))
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  } catch (error) {
//    console.log(error);
//    return;
//  }

//  return respuesta;
//};

export const getAllVenta = ():Venta[] => {
  const ventas = localStorage.getItem('ventas');

  if(!ventas) return [];

  return JSON.parse(ventas)
};

export const createVenta = (venta: Venta) => {
  let id = Number(localStorage.getItem('id_ventas'));
  const ventas = localStorage.getItem('ventas');
  let ventaJSON:Venta[] = []

  if(!id) id = 1;
  else id++

  if(ventas){
    ventaJSON = JSON.parse(ventas)
  };

  venta.id = id.toString();
  ventaJSON.push(venta);

  let ventaString = JSON.stringify(ventaJSON)

  localStorage.setItem('ventas', ventaString);
  localStorage.setItem('id_ventas', id.toString());
};

export const deleteVenta = (id: string) => {
  const ventas = localStorage.getItem('ventas');
  if(!ventas) return;

  let ventaJSON:Venta[] = JSON.parse(ventas)
  let ventaJSONNew:Venta[] = ventaJSON.filter(n => n.id !== id);
  let ventaString = JSON.stringify(ventaJSONNew)

  localStorage.setItem('ventas', ventaString);
};

export const deleteAllVenta = () => {
  localStorage.setItem('ventas', "");
};