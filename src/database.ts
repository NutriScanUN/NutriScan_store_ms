import { Sequelize } from "sequelize";

console.log(process.env.DB_URL);
const sequelize = new Sequelize(process.env.DB_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } 
})

export default sequelize;