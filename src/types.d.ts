export interface Productos{
    id?:number;
    precio:number;
    nombre:string;
    vendidos:number;
}

export interface ProductoVendido{
    id?:number,
    cantidad:number;
}

export interface Ventas{
    id?:number
    precio:number
    cantidad:number
    //ProductoVendido[] "json"...
    venta:string
}