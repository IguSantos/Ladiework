const express = require("express");
var session = require("express-session");
const app = express();
const router = express.Router();
const port = 2025;
const env = require('dotenv').config();

app.use(session({ // Usa o midleware de sessão do express
  secret: "Mimiko", // Nome secreto do cookie usada na plataforma para proteger de adulterações
  resave: false, // Indica se a sessão é armazenada mesmo sem alteração. Colocada como "false" desativa e melhora o desempenho
  saveUninitialized: true, // Deves ser salva mesmo não sendo iniciada?
  cookie: { secure: false } // Já que estamo enviados via http (não https) o cookie não é seguro
}));


router.get("/", (req, res) => {
  res.send("Rota raiz");
});

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var rotas = require("./app/routes/router");
// const { cookie } = require("express-validator");
app.use("/", rotas);

app.listen(port, () => {
  console.log(`Abriu na porta ${port}\nhttp://localhost:${port}`);
});

module.exports = router;
