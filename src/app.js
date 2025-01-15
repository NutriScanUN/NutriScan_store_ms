const express = require("express");
const routes = require("./routes");
const sequelize = require("./database");

const app = express();
const PORT = 3001

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
