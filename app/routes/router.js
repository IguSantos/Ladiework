var express = require("express");
var router = express.Router();

router.get('/cursos', (req, res) => {
  res.render('pages/cursos');
});

router.get('/cursoinfo', (req, res) => {
  res.render('pages/cursoinfo');
});

router.get('/criar', (req, res) => {
  res.render('pages/create');
});

router.get('/pagamentopix', (req, res) => {
  res.render('pages/pagamentopix');
});

router.get('/assistiraula', (req, res) => {
  res.render('pages/viewvideocurse');
});

router.get('/carrinho', (req, res) => {
  res.render('pages/carrinho');
});


router.get('/cadastro', (req, res) => {
  res.render('pages/cadastro');
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/chat', (req, res) => {
  res.render('pages/chat');
});

router.get('/finalizarcompra', (req, res) => {
  res.render('pages/finalizarcompra');
});

router.get("/", function (req, res) {
  res.render("pages/index", { pagina: "home", logado: null });
});

module.exports = router;