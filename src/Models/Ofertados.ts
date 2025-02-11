import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Tiendas from "./Tiendas.js";
import Productos from "./Productos.js";

export type OfertadosObject = {
  id_tienda: number;
  id_producto: number;
}

const Ofertados = sequelize.define("Ofertados", {
  id_tienda: {
    type: DataTypes.INTEGER,
    references: {
      model: Tiendas,
      key: "id_tienda"
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


Productos.belongsToMany(Tiendas, {through: "Ofertados", onDelete: "CASCADE", foreignKey: {name: "id_tienda"}});
Tiendas.belongsToMany(Productos, {through: "Ofertados", onDelete: "CASCADE", foreignKey: {name: "id_producto"}});

export default Ofertados
