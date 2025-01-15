const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Tienda = require("./Tienda");

const Productos = sequelize.define("Productos",{
  producto_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tienda_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  longitud:{
    type: DataTypes.CHAR
  },
  referencia:{
    type: DataTypes.CHAR,
    unique: true
  },
  nombre:{
    type: DataTypes.CHAR
  },
  descripcion:{
    type: DataTypes.CHAR
  },
  foto:{
    type: DataTypes.CHAR
  }
},
{
  freezeTableName: true,
  timestamps: false
}
);


module.exports = Productos;