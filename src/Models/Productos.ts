import { DataTypes } from "sequelize";
import sequelize from "../database.js";

export type ProductoObject = {
  id_producto:  number | undefined | null;
  referencia: string;
  nombre: string| undefined | null;
  descripcion: string| undefined | null;
  url_imagen:  string| undefined | null;
}

export type ProductoRequest = {
  id_tienda: number | undefined | null;
  id_producto:  number | undefined | null;
  referencia: string;
  nombre: string| undefined | null;
  descripcion: string| undefined | null;
  url_imagen:  string| undefined | null;
}

export function CreateProductObjectFromAny(obj: any){
  const {
    id_producto,
    referencia,
    nombre,
    descripcion,
    url_imagen
  } = obj;

  return {
    id_producto,
    referencia,
    nombre,
    descripcion,
    url_imagen
  } as ProductoObject;
}

const Productos = sequelize.define("Productos",{
  id_producto:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referencia:{
    type: DataTypes.CHAR,
    unique: true,
    allowNull: false
  },
  nombre:{
    type: DataTypes.CHAR
  },
  descripcion:{
    type: DataTypes.CHAR
  },
  url_imagen:{
    type: DataTypes.CHAR
  }
},
{
  freezeTableName: true
}
);


export default Productos;