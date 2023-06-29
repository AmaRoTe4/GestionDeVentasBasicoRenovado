export interface Producto{
    id?:string;
    _id?:string;
    precio:number;
    nombre:string;
    vendidos:number;
}

export interface Venta {
    id?:string;
    fecha:string;
    productos?:string;
    cantidadPV:number;
    precioT:number;
}