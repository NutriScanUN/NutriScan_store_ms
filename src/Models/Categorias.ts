import { DataTypes } from "sequelize";
import sequelize from "../database.js";

export type CategoriaObject = {
  id_categoria: number | undefined | null;
  descripcion: string | undefined | null;
  nombre: string;
};

const Categorias = sequelize.define("Categorias", {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  nombre: {
    type: DataTypes.CHAR,
    unique: true,
    allowNull: false
  }
});

export default Categorias
