import { usuarios } from "../datos/usuarios.js";
import bcrypt from 'bcrypt';
import { crearToken } from "../helpers/jwt_users.js";

let usuariosDevolver = usuarios;

export class Usuario{

    static register = async(usuario) =>{
        if (!usuario.success){
            return Error;
        }

        const nuevoUsuario = {
            ...usuario.data
        }

        if (usuariosDevolver.find(usuario => usuario.nick === nuevoUsuario.nick) ||
        usuariosDevolver.find(usuario => usuario.mail === nuevoUsuario.mail))
        {
            return "usuario duplicado"
        }

        nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10);
        usuariosDevolver = [...usuariosDevolver, nuevoUsuario];

        return nuevoUsuario

    }

    static login = async(usuario) => {
        let usuarioRecibido = usuario;

        let usuarioRegistrado = usuariosDevolver.find((usuario) => usuario.nick == usuarioRecibido.nick);

        if (!usuarioRegistrado)
            return "No existe el usuario";

        let pwd = await bcrypt.compare(usuarioRecibido.password,usuarioRegistrado.password);

        if (!pwd)
            return "Fallo de autentificación";

        const token = crearToken(usuarioRegistrado);
        
        const usuarioFormateado = {
            nick: usuarioRegistrado.nick,
            mail: usuarioRegistrado.mail,
            token: token
        }

        return usuarioFormateado;
    }

}