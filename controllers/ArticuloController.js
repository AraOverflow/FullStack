import { validarArticulo, validarParcial } from "../helpers/zod.js";

export class ArticuloController {

    constructor(modelo){
        this.modelo = modelo;
    }

    getAll = async(request, response) =>{
        response.json(await this.modelo.getAll());
    }

    getOneById = async(request, response) =>  {
        const id = request.params.id;

        const articulo = await this.modelo.getOneByID(id);

        if (articulo) {
            response.json(articulo);
        } else {
            response.status(400).end();
        }
    }

    delete = async(request, response) => {
        const id = request.params.id;
        const articulosDevolver = await this.modelo.delete(id);

        if (articulosDevolver) {
            response.json(articulosDevolver)
        }
        else {
            response.status(400).end();
        }
    }

   create =  async(request, response) => {
        const articulo = validarArticulo(request.body);

        if (articulo.error) {
            return response.status(400).json('Validación Incorrecta')
        }

        const nuevoArticulo = await this.modelo.create(articulo);

        response.json(nuevoArticulo);
    }

    update = async(request, response) => {
        const id = request.params.id;
        const articuloValidado = validarParcial(request.body);

        const nuevoArticulo = await this.modelo.update(id, articuloValidado);

        response.json(nuevoArticulo);
    }
}