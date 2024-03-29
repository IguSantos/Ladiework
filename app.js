const express = require("express");
const app = express();
const port = 2024;
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rota raiz");
});

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

app.listen(port, () => {
  console.log(`Abriu na porta ${port}\nhttp://localhost:${port}`);
});

module.exports = router;
