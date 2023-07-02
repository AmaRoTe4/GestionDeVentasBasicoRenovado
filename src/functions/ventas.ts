import { Venta } from "../types";
import { getAllVenta, createVenta, deleteVenta, deleteAllVenta } from "../database/ventas";

export const GetAllVenta = () => {
  return getAllVenta();
};

export const CreateVenta = (venta: Venta) => {
  return createVenta(venta);
};

export const DeleteVenta = (id: string) => {
  return deleteVenta(id);
};

export const DeleteAllVenta = () => {
  return deleteAllVenta();
};
