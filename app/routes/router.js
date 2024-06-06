var express = require("express");
var router = express.Router();
const pool = require("../../config/pool_connections")
const userController = require("../controllers/userController")
const { checkAuthenticatedUser, clearSession } = require("../models/authenticator_middleware");


router.get("/", checkAuthenticatedUser, function (req, res) {
  res.render("pages/main", { pagina: "home", logado: false });
});

// req.session.logado

router.get("/cadastrar", function (req, res) {
  res.render("pages/main", {
    pagina: "cadastro",
    logado: null,
    errorsList: null,
    valores: {
      nome_usu: "",
      email_usu: "",
      senha_usu: "",
      aniversario_usu: "",
      numero_usu: "",
      genero_usu: "",
      foto_usu: "",
      desc_usu: ""
    }
  });
});

router.get('/cursos', (req, res) => {
  res.render('pages/main', { pagina: "cursos", logado: null });
});

// logout
router.get("/sair", clearSession, function (req, res) {
  res.redirect("/");
});

router.get('/mentorias', (req, res) => {
  res.render('pages/main', { pagina: "mentorias", logado: null });
});

// router.get('/cursos',  function (req, res) {
//  res.render('pages/main', { pagina: "cursos", logado: null }); PERGUNTAR
//   coursesController.listPaginatedCourses(req, res);
// });

router.get('/login', (req, res) => {
  res.render('pages/main', { pagina: "login", logado: null });
});

router.get('/chat', (req, res) => {
  res.render('pages/main', { pagina: "chat", logado: true });
});

router.get('/carrinho', (req, res) => {
  res.render('pages/main', { pagina: "carrinho", logado: null });
});

router.get('/finalizarcompra', (req, res) => {
  res.render('pages/main', { pagina: "finalizarcompra", logado: true });
});

router.get('/pagamentopix', (req, res) => {
  res.render('pages/main', { pagina: "pagamentopix", logado: true });
});

router.get('/criar', (req, res) => {
  res.render('pages/main', { pagina: "create", logado: true });
});

router.get('/sobreocurso', (req, res) => {
  res.render('pages/main', { pagina: "cursoinfo", logado: null });
});

router.get('/assistiraula', (req, res) => {
  res.render('pages/main', { pagina: "viewvideocourse", logado: null });
});


module.exports = router;