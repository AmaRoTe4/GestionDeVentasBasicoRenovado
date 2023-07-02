import { Producto } from "../types";

//export const getAllProducto = async () => {
//  try {
//    let info: Producto[] = [];
//    await fetch(import.meta.env.VITE_URL + "productos")
//      .then((response) => response.json())
//      .then((data) => {
//        info = data;
//      })
//      .catch((error) => console.error(error));

//    return info;
//  } catch (error) {
//    console.log(error);
//    return;
//  }
//};

//export const getProducto = async (id: string) => {
//  let datos: Producto = {
//    precio: 0,
//    nombre: "",
//    vendidos: 0,
//  };

//  try {
//    await fetch(import.meta.env.VITE_URL + "productos/" + id)
//      .then((response) => response.json)
//      .then((data) => console.log(data))
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  } catch (error) {
//    console.error(error);
//    return;
//  }

//  return datos;
//};

//export const updateProducto = async (prod: Producto) => {
//  const datos = JSON.stringify({
//    clave: import.meta.env.VITE_CLAVE,
//    id: prod?.id,
//    precio: prod?.precio,
//    nombre: prod?.nombre,
//    vendidos: prod?.vendidos,
//  });

//  let respuesta:any = false; 
//  try{
//    respuesta = await fetch(
//      import.meta.env.VITE_URL + "productos/u/" + prod?.id,
//      {
//        body: datos,
//        method: "POST",
//      }
//    )
//      .then((response) => response.json)
//      .then((data) => console.log(data))
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  }catch(error) {
//    console.error(error)
//    return;
//  }

//  return respuesta;
//};

//export const createProducto = async (prod: Producto) => {
//  const datos = JSON.stringify({
//    clave: import.meta.env.VITE_CLAVE,
//    precio: prod?.precio,
//    nombre: prod?.nombre,
//  });

//  let respuesta:any = false;
//  try{
//    respuesta = await fetch(import.meta.env.VITE_URL + "productos/c/", {
//      body: datos,
//      method: "POST",
//    })
//      .then((response) => response.json)
//      .then((data) => console.log(data))
//      .catch((error) => {
//        console.error("Error al realizar la solicitud: ", error);
//      });
//  }catch(error) {
//    console.error(error)
//    return;
//  }

//  return respuesta;
//};

//export const deleteProducto = async (id: string) => {
//  let respuesta:any = false;

//  try{
//    respuesta = await fetch(import.meta.env.VITE_URL + "productos/d/" + id, {
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
//  }catch(error) {
//    console.error(error)
//    return;
//  }

//  return respuesta;
//};

export const getAllProducto = ():Producto[] => {
  const productos = localStorage.getItem('productos');

  if(!productos) return [];

  return JSON.parse(productos)
};

export const getProducto = (id: string):Producto | undefined => {
  const productos = localStorage.getItem('productos');
  
  if(!productos) return undefined;

  let productosJSON:Producto[] = JSON.parse(productos)
  return productosJSON.find(n => n.id === id)
};

export const updateProducto = (prod: Producto) => {
  const productos = localStorage.getItem('productos');
  
  if(!productos) return;

  let productosJSON:Producto[] = JSON.parse(productos)
  let updateProducto:Producto | undefined = productosJSON.find(n => n.id === prod.id);
  
  if(!updateProducto) return;

  let productosJSONNew:Producto[] = productosJSON.filter(n => n.id !== prod.id);

  updateProducto.precio = prod.precio;
  updateProducto.nombre = prod.nombre;
  updateProducto.vendidos = prod.vendidos;

  productosJSONNew.push(updateProducto)

  let productosString = JSON.stringify(productosJSONNew)

  localStorage.setItem('productos', productosString);
};

export const sumarVendidos = (id:string , vendidos:number) => {
  const productos = localStorage.getItem('productos');
  
  if(!productos) return;

  let productosJSON:Producto[] = JSON.parse(productos)
  let updateProducto:Producto | undefined = productosJSON.find(n => n.id === id);
  
  if(!updateProducto) return;

  let productosJSONNew:Producto[] = productosJSON.filter(n => n.id !== id);
  updateProducto.vendidos += vendidos;
  productosJSONNew.push(updateProducto)

  let productosString = JSON.stringify(productosJSONNew)
  localStorage.setItem('productos', productosString);
};

export const createProducto = (prod: Producto) => {
  let id:number = Number(localStorage.getItem('id_productos'));
  const productos = localStorage.getItem('productos');
  let productosJSON:Producto[] = [];

  if(!id) id = 1;
  else id++

  prod.id = id.toString();

  if(productos){
    productosJSON = JSON.parse(productos)
  };

  productosJSON.push(prod);

  let productosString = JSON.stringify(productosJSON)

  localStorage.setItem('productos', productosString);
  localStorage.setItem('id_productos', id.toString());
};

export const deleteProducto = (id: string) => {
  const productos = localStorage.getItem('productos');
  if(!productos) return;

  let productosJSON:Producto[] = JSON.parse(productos)
  let productosJSONNew:Producto[] = productosJSON.filter(n => n.id !== id);
  let productosString = JSON.stringify(productosJSONNew)

  localStorage.setItem('productos', productosString);
};

export const deleteAllProducto = () => {
  localStorage.setItem('productos', "");
};