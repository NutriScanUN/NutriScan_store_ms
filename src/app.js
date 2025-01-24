require("dotenv").config();
const express = require("express");
var cors = require('cors');
const routes = require("./routes");
const sequelize = require("./database");

const app = express();
const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", routes);

sequelize.sync().then( val => {
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
}
).catch(err => {
  console.error("error: ",err);
})
