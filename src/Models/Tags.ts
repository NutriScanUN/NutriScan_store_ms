import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Categorias from "./Categorias.js";
import Productos from "./Productos.js";

const Tags = sequelize.define("Tags", {
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categorias,
      key: "id_categoria"
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Productos,
      key: "id_producto"
    }
  }
},
{
  freezeTableName: true
}
);

Categorias.belongsToMany(Productos, {through: Tags, onDelete: "CASCADE", foreignKey:{name: "id_producto"}});
Productos.belongsToMany(Categorias, {through: Tags, onDelete: "CASCADE", foreignKey:{name: "id_categoria"}});

export default Tags
