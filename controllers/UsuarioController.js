import { validarUsuario } from "../helpers/zodUsuers.js";

export class UsuarioController{

    constructor(modelo){
        this.modelo = modelo;
    }

    register = async(request, response) =>{
        console.log(request.body);
        const usuario = validarUsuario(request.body);

        if (usuario.error){
            return response.status(400).json('Error de validación');
        }

        const nuevoUsuario = await this.modelo.register(usuario);


        response.json(nuevoUsuario);
    }

    login = async(request,response) => {
        const datosAuth = request.body;

        const usuario = await this.modelo.login(datosAuth);

        if (usuario){
            response.json(usuario);
        }
        else{
            response.status(400).end();
        }


    }
}