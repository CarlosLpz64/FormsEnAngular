export interface Asiento {
    _id: string;
    nombre: string;
    estado: boolean; //True = ocupado
    seleccionado: boolean | null;
}
