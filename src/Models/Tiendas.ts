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
    
    get() : string {
      const val = this.getDataValue("nombre")
      return val ? (val as string).trim(): val;
    }
    
  },
  fecha_suscripcion:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  direccion:{
    type: DataTypes.CHAR,
    
    get() : string {
      const val = this.getDataValue("direccion")
      return val ? (val as string).trim(): val;
    }
    
  },
  descripcion:{
    type: DataTypes.TEXT
  },
  foto_tienda:{
    type: DataTypes.CHAR,
    
    get() : string {
      const val = this.getDataValue("foto_tienda")
      return val ? (val as string).trim(): val;
    }
    
  },
  enlace:{
    type: DataTypes.CHAR,
    
    get() : string {
      const val = this.getDataValue("enlace")
      return val ? (val as string).trim(): val;
    }
    
  }
},
{
  freezeTableName: true
}
);

export default Tiendas;