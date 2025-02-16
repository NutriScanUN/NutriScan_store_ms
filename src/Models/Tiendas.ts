import { DataTypes } from "sequelize";
import sequelize from "../database.js";

export type TiendaObject = {
  id_tienda: number | undefined | null;
  uid: string;
  nombre: string | undefined | null;
  fecha_suscripcion: string;
  direccion: string | undefined | null;
  descripcion: string | undefined | null;
  foto_tienda: string | undefined | null;
  enlace: string | undefined | null;
}

const Tiendas = sequelize.define("Tiendas",{
  id_tienda:{
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
  foto_tienda:{
    type: DataTypes.CHAR
  },
  enlace:{
    type: DataTypes.CHAR
  }
},
{
  freezeTableName: true
}
);

export default Tiendas;