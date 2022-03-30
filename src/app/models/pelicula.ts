export interface Pelicula {
    //CREATE
    id: number;
    nombre: string;
    categoria: number;
    duracion: number;
    descripcion: string;
    director: number;
    productora: number;
    imagenes: string;
    //READ
    Categoria: CategoriaObj;
    Directore: DirectoreObj;
    Productura: ProducturaObj;
}

interface CategoriaObj {
    nombre: string;
    id: number;   
}

interface DirectoreObj {
    nombre: string;
    id: number;   
}

interface ProducturaObj {
    nombre: string;
    id: number;   
}
