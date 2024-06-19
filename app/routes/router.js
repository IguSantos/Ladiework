var express = require("express");
var router = express.Router();
const pool = require("../../config/pool_connections")
const userController = require("../controllers/userController")
const mentoryController = {  addMentory } = require("../controllers/coursesController")

const { checkAuthenticatedUser, clearSession, recordAuthenticatedUser } = require("../models/authenticator_middleware");
const mentoringController = require("../controllers/mentoringController");



router.get("/", checkAuthenticatedUser, function (req, res) {
  res.render("pages/main", { pagina: "home", logado: req.session.logado });
  console.log("Session logado:", req.session.logado);
});


// req.session.logado -- o que tnha
// nao sair 


// CADASTRO
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
      foto_usu: "",
    }
  });  // E number? Logado erro...
});

router.post("/cadastrar",
  userController.validationRulesFormCad,
  async function (req, res) {
    userController.cadastrar(req, res);
  });

// LOGIN
router.get('/login', (req, res) => {
  res.render('pages/main', {
    pagina: "login",
    logado: req.session.logado,
    errorsList: null,
  });
});

router.post(
  "/login", recordAuthenticatedUser,
   function (req, res) {
    userController.logar(req, res);
  });


router.get("/sair", clearSession, function (req, res) {
  res.redirect("/");
});


// CURSOS

router.get('/cursos', function (req, res) {
  coursesController.listPaginatedCourses(req, res);
});


// CRIAR
router.get('/criar', (req, res) => {
  res.render('pages/main', {
    pagina: "create",
    dados: null,  
    errorsList: null,
    logado: req.session.logado
  });
});

// Envio do formulario
router.post("/criar",  function (req, res) {
    mentoringController.addMentoring(req, res);
  }
);

// PAGINA DE ADMINISTRAÇÃO MENTORAr
router.get('/paginadeadministracao', (req, res) => {
  console.log("Valor de mentoring na sessão:", req.session.latestMentoring); // Adiciona o console.log aqui
  res.render('pages/adm/usuaria/dashboard', { logado: req.session.logado, mentoring: req.session.latestMentoring });
});



// router.post("/criar",  function (req, res) {
//   coursesController.addCourse(req, res);
// }
// );


router.get('/informacao_da_mentoria', (req, res) => {
  res.render('pages/main', { pagina: "mentoria_info", logado: req.session.logado});
});




// MENTORIAS
router.get('/mentorias', (req, res) => {
  res.render('pages/main', { pagina: "mentorias", logado: req.session.logado });
});

router.get('/informacao_da_mentoria', (req, res) => {
  res.render('pages/main', { pagina: "mentoria_info", logado: null });
});

router.get('/privacidade', (req, res) => {
  res.render('pages/main', { pagina: "politicadeprivacidade", logado: req.session.logado });
});

router.get('/termosecondicoes', (req, res) => {
  res.render('pages/main', { pagina: "termos", logado: req.session.logado });
});

router.get('/quemsomos', (req, res) => {
  res.render('pages/main', { pagina: "quemsomos", logado: req.session.logado });
});



router.get('/chat', (req, res) => {
  res.render('pages/main', { pagina: "chat", logado: req.session.logado });
});

router.get('/carrinho', (req, res) => {
  res.render('pages/main', { pagina: "carrinho", logado: req.session.logado });
});

router.get('/finalizarcompra', (req, res) => {
  res.render('pages/main', { pagina: "finalizarcompra", logado: req.session.logado });
});

router.get('/pagamentopix', (req, res) => {
  res.render('pages/main', { pagina: "pagamentopix", logado: req.session.logado });
});


router.get('/sobreocurso', (req, res) => {
  res.render('pages/main', { pagina: "cursoinfo", logado: req.session.logado });
});

router.get('/assistiraula', (req, res) => {
  res.render('pages/main', { pagina: "viewvideocourse", logado: req.session.logado });
});


module.exports = router;