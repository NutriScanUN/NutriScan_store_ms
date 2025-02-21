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
      return (this.getDataValue("nombre") as string).trim();
    }
    
  },
  fecha_suscripcion:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  direccion:{
    type: DataTypes.CHAR,
    
    get() : string {
      return (this.getDataValue("direccion") as string).trim();
    }
    
  },
  descripcion:{
    type: DataTypes.TEXT
  },
  foto_tienda:{
    type: DataTypes.CHAR,
    
    get() : string {
      return (this.getDataValue("foto_tienda") as string).trim();
    }
    
  },
  enlace:{
    type: DataTypes.CHAR,
    
    get() : string {
      return (this.getDataValue("enlace") as string).trim();
    }
    
  }
},
{
  freezeTableName: true
}
);

export default Tiendas;