import { Producto } from "../types";
import {
  createProducto,
  deleteProducto,
  getAllProducto,
  getProducto,
  updateProducto,
} from "../database/productos";

export const GetAllProducto = async () => {
  return await getAllProducto();
};

export const GetProducto = async (id: string) => {
  return await getProducto(id);
};

export const UpdateProducto = async (prod: Producto) => {
  return await updateProducto(prod);
};

export const CreateProducto = async (prod: Producto) => {
  return await createProducto(prod);
};

export const DeleteProducto = async (id: string) => {
  return await deleteProducto(id);
};
