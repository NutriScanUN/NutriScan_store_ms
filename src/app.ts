import "dotenv/config"
import express from "express";
import routes from "./routes.js";
import sequelize from "./database.js";
import { SyncOptions } from "sequelize";
import cors from "cors";
import promClient  from "prom-client";


const app = express();
const PORT = process.env.PORT || 3001

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const syncOptions:SyncOptions = {
  force: (process.env.SQLIZE_FORCE === "true"),
  alter: (process.env.SQLIZE_ALTER === "true")
}

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200
}

app.use(cors());

app.use(express.json())
app.use("/api", routes);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

sequelize.sync(syncOptions).then( val => {
  
  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  })
}
).catch(err => {
  console.error("error: ",err);
})
