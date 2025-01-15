const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Productos = require("./Productos");
const { defaults } = require("pg");


const Tienda = sequelize.define("Tienda",{
  tienda_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid:{
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre:{
    type: DataTypes.CHAR, 
  },
  fecha_suscripcion:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  direccion:{
    type: DataTypes.CHAR
  },
  descripcion:{
    type: DataTypes.TEXT
  },
  fotos:{
    type: DataTypes.CHAR
  },
  enlace:{
    type: DataTypes.CHAR
  }
},
{
  freezeTableName: true,
  timestamps: false
}
);

Tienda.hasMany(Productos, {foreignKey: "tienda_id", as: "products"});
Productos.belongsTo(Tienda, {foreignKey: "tienda_id"});

module.exports = Tienda;