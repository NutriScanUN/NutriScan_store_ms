import "dotenv/config"
import express from "express";
import routes from "./routes.js";
import sequelize from "./database.js";
import { SyncOptions } from "sequelize";
import cors from "cors";
import promClient  from "prom-client";


const app = express();
const PORT = process.env.PORT || 3001

const register = promClient.register;
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de las solicitudes HTTP en segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5] // Intervalos de tiempo en segundos
});
register.registerMetric(httpRequestDurationMicroseconds );

const cacheRequests = new promClient.Counter({
  name: "user_api_cache_total",
  help: "Total de requests al cache",
  labelNames: ["instance", "type"]
});

register.registerMetric(cacheRequests);

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP recibidas',
  labelNames: ['method', 'route', 'status_code'],
});

// Simulación: Incrementar contador cuando se consulta caché
app.get("/cache", (req, res) => {
  cacheRequests.inc({ instance: "user-api", type: "Request" });
  res.json({ message: "Cache request counted" });
});

const syncOptions:SyncOptions = {
  force: (process.env.SQLIZE_FORCE === "true"),
  alter: (process.env.SQLIZE_ALTER === "true")
}

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200
}

app.use(cors());

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    httpRequestTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

app.use(express.json())
app.use("/api", routes);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

sequelize.sync(syncOptions).then( val => {
  
  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  })
}
).catch(err => {
  console.error("error: ",err);
})
