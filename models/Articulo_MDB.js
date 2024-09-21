import mongoose, { model, Schema } from "mongoose";
import {conexion} from "../helpers/conexion.js";

conexion();

const articuloSchema = new Schema(

    {
      titulo: String,
      cuerpo: String,
      usuario: String

    },
    {
        versionKey: false
    }

)

const Articulo = model('Articulo',articuloSchema);

export class ArticuloModel{

    static async getAll(){
        try{
            return Articulo.find();
        }
        catch(e){
            console.log(e);
        }
    }

    static async getOneByID(id){
        try{
            return await Articulo.findById(id);
        }
        catch(e){
            console.log(e);
        }
    }

    static async delete(id){
        try{
            return Articulo.deleteOne({_id: id})
        }
        catch{
            console.log(e);
        }
    }

    static async create(articulo){
        if (!articulo.success) {
            return Error;
        }

        const nuevoArticulo = {
            ...articulo.data
        }

        const articuloGuardar = new Articulo(nuevoArticulo);

        try{
            await articuloGuardar.save();
            return nuevoArticulo;
        }
        catch(e){
            console.log(e);
        }


    }

    static async update(id,validacion){
        if (!validacion.success) {
            response.status(400).json('Validación Incorrecta')
        }
        try{
            return await Articulo.findOneAndUpdate({_id: id}, {...validacion.data}, {new:true});
        }
    
    catch(e){
        console.log(e);
    }
}

}