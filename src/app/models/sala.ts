export interface Sala {
    //CREATE
    id: number;
    numero: number;
    cine: number;
    //READ
    Cine: CineObj;
}

interface CineObj {
    //CREATE
    nombre: string;
    id: number;
}