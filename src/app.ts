import "dotenv/config"
import express from "express";
import routes from "./routes.js";
import sequelize from "./database.js";
import { SyncOptions } from "sequelize";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001

const syncOptions:SyncOptions = {
  force: (process.env.SQLIZE_FORCE === "true"),
  alter: (process.env.SQLIZE_ALTER === "true")
}

app.use(express.json())
app.use("/api", routes);

sequelize.sync(syncOptions).then( val => {
  
  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  })
}
).catch(err => {
  console.error("error: ",err);
})
