import { articulos } from "../datos/articulos.js";

let articulosDevolver = articulos;

export class Articulo {

    static getAll() {
        return articulosDevolver;
    }

    static getOneByID(id) {
        return articulosDevolver.find(articulo => articulo.id == id);
    }

    static delete(id) {
        return articulosDevolver.filter(articulo => articulo.id != id);
    }

    static create(articulo) {

        if (!articulo.success) {
            return Error;
        }

        const nuevoArticulo = {
            ...articulo.data
        }

        articulosDevolver = [...articulosDevolver, nuevoArticulo];

        return nuevoArticulo;
    }

    static update(id, articulo) {
        if (!articulo.success) {
            response.status(400).json('Validación Incorrecta')
        }

        const articuloIndice = articulosDevolver.findIndex(articulo => articulo.id == id);

        if (articuloIndice == -1) {
            return response.status(400).json('Articulo no encontrado');
        }
        const nuevoArticulo = {
            ...articulosDevolver[articuloIndice],
            ...articulo.data
        }

        articulosDevolver[articuloIndice] = nuevoArticulo;

        return nuevoArticulo;
    }


}