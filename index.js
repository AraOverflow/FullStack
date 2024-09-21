import express from "express";
import { Enrutador } from "./routes/articulosRoutes.js";
import { ArticuloModel } from "./models/Articulo_MDB.js";
import { CreadorUsuarios } from "./routes/usuariosRoutes.js";
import { UsuarioModel } from "./models/Usuario_MDB.js";
import {auth} from "./middlewares/auth.js"

const app = express();

app.use(express.json());

const PORT = 1234;

app.use('/api/articulos',auth, Enrutador(ArticuloModel));
app.use('/api/usuarios',CreadorUsuarios(UsuarioModel));

app.listen(PORT, () =>{
    console.log("Servidor a la espera");
})