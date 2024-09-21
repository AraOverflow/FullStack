import mongoose from "mongoose";

export const conexion = async () =>{
    try {
        await mongoose.connect("mongodb+srv://USUARIO:PASSWORD@cluster0.8ynyd.mongodb.net/CursoFS");
        console.log("Conectado Correctamente");
    
    }
    catch(e){
        console.log(e);
    }
}