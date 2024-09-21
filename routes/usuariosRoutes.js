import {Router} from "express";
import {UsuarioController} from "../controllers/UsuarioController.js";

export const CreadorUsuarios = (modelo) =>{
    const controlador = new UsuarioController(modelo);

    const usuarioRouter = Router();

    usuarioRouter.post("/", controlador.register);
    
    usuarioRouter.post("/login", controlador.login);

    return usuarioRouter;

}