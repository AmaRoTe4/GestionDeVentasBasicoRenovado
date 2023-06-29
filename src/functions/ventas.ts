import { Venta } from "../types";
import { 
    getAllVenta, 
    createVenta,
    deleteVenta,
} from "../database/ventas";

export const GetAllVenta = async () => {
  return await getAllVenta();
};

export const CreateVenta = async (venta:Venta) => {
    return await createVenta(venta);
};

export const DeleteVenta = async (id:string) => {    
    return await deleteVenta(id);
};
