import { Producto } from "../types";
import {
  createProducto,
  deleteAllProducto,
  deleteProducto,
  getAllProducto,
  getProducto,
  sumarVendidos,
  updateProducto,
} from "../database/productos";

export const GetAllProducto = ():Producto[] => {
  return getAllProducto();
};

export const GetProducto = (id: string):Producto | undefined => {
  return getProducto(id);
};

export const UpdateProducto = (prod: Producto) => {
  return updateProducto(prod);
};

export const CreateProducto = (prod: Producto) => {
  return createProducto(prod);
};

export const DeleteProducto = (id: string) => {
  return deleteProducto(id);
};

const SumarVendidos = (id:string , vendidos:number) => {
  return sumarVendidos(id, vendidos);
}

export const UpdateProductosALaVez = (productosAct: Producto[] , productosGuardados:Producto[]):Producto[] => {
  let productosUsar:Producto[] = [...productosGuardados];

  productosAct.forEach(n => {
    if(!n.id) return;
    
    SumarVendidos(n.id , n.vendidos);
    let aux:Producto[] = productosUsar.filter(m => n.id !== m.id)
    let actualizar = productosUsar.find(m => n.id === m.id)
    if(actualizar){
      actualizar.vendidos += n.vendidos
      aux.push(actualizar)
      productosUsar = [...aux];
    }
  })

  return productosUsar
};

export const DeleteAllProducto = () => {
  return deleteAllProducto()
}