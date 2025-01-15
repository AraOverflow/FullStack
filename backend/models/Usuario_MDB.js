import mongoose, {model, Schema } from "mongoose";
import { conexion } from "../helpers/conexion.js";
import bcrypt from "bcrypt";
import { crearToken } from "../helpers/jwt_users.js";

conexion();

const usuarioSchema = new Schema(

    {
        nick: String,
        password: String,
        mail: String
    },
    {
        versionKey: false
    }
)

const Usuario = model("Usuario", usuarioSchema);

export class UsuarioModel{

    static register = async(usuario) =>{
        if (!usuario.success){
            return Error;
        }

        const nuevoUsuario = {...usuario.data}

        const usuarioExiste = await Usuario.findOne({$or: [{nick: nuevoUsuario.nick},{mail: nuevoUsuario.mail}]});

        if (usuarioExiste){
            eturn {status:400, message: "Usuario Ya registrado"};
        }

        try{
            nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10);

            const usuarioGuardar = new Usuario(nuevoUsuario);

            await usuarioGuardar.save();
            return nuevoUsuario;
        }
        catch(e){
            console.log(e);
        }

    }

    static login = async(usuario) =>{
        let usuarioEncontrado = usuario;

        try{
            usuarioEncontrado = await Usuario.findOne({nick: usuarioEncontrado.nick});

            if (!usuarioEncontrado){
                return {status:400, message: "Usuario No encontrado"};
            }

            const pwd = await bcrypt.compare(usuario.password, usuarioEncontrado.password);

            if (!pwd){
                return {status:400, message: "Error de Autentificación"};
            }

            const token = crearToken(usuarioEncontrado);
        
            const usuarioFormateado = {
            nick: usuarioEncontrado.nick,
            mail: usuarioEncontrado.mail,
            token: token
        }

        return usuarioFormateado;


        }
        catch(e){
            console.log(e);
        }

    }
 



}