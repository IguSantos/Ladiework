var express = require("express");
var router = express.Router();
const pool = require("../../config/pool_connections")
const userController = require("../controllers/userController")
const mentoryController = { addMentory } = require("../controllers/coursesController")

const { checkAuthenticatedUser, clearSession, recordAuthenticatedUser, verifyAuthorizedUser } = require("../models/authenticator_middleware");
const mentoringController = require("../controllers/mentoringController");
const uploadFile = require("../util/uploader")();


router.use((req, res, next) => {
  res.locals.logado = req.session.logado;
  res.locals.mentoring = req.session.latestMentoring;
  
  next();
 });
 


// SUMÁRIO:
// Cadastro
// Cadastro de Usuário
// Verificar E-mail
// Login
// Logout
// Cursos
// Criar
// Página de Administração Mentora/Palestrante
// Administrador
// Informação da Mentoria
// Histórico de Compras
// Política de Privacidade
// Termos e Condições
// Quem Somos
// Chat
// Carrinho de Compras
// Finalizar Compra
// Pagamento via Pix
// Sobre o Curso
// Assistir Aula
// Home


router.get("/", checkAuthenticatedUser, function (req, res) {
  res.render("pages/main", { pagina: "home", dadosNotificacao: null, logado: req.session.logado, login: req.session.login, mentoring: req.session.latestMentoring });

});

// CADASTRO
router.get("/cadastrar", function (req, res) {
 res.render("pages/main", {
   pagina: "cadastro",
   logado: null,
   errorsList: null,
   dadosNotificacao: null,
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

router.post("/verificar-email", async function (req, res) {
 const { email_usu } = req.body;

 try {
   // Verificar se o e-mail já existe
   const [emailResults] = await pool.query('SELECT 1 FROM usuario WHERE EMAIL_USUARIO = ?', [email_usu]);
   const emailExists = emailResults.length > 0;

   // Retornar resposta JSON indicando se o e-mail já existe
   return res.json({ exists: emailExists });
 } catch (error) {
   // Tratar o erro e responder com status 500
   console.error("Erro ao verificar e-mail:", error);
   if (!res.headersSent) {
     return res.status(500).send("Erro ao verificar e-mail");
   }
 }
});


router.post("/cadastrar",
 uploadFile("foto_usu"),
 userController.validationRulesFormCad,

 async function (req, res) {
   try {
     // Prosseguir com o cadastro
     await userController.cadastrar(req, res);

     // Não é necessário responder aqui pois a função `cadastrar` já faz o redirecionamento
   } catch (error) {
     // Tratar o erro e responder com status 500
     console.error("Erro ao cadastrar usuário [ROUTER]:", error);
     if (!res.headersSent) {
       return res.status(500).send("Erro ao cadastrar usuário [ROUTER]");
     }
   }
 }
);


// LOGIN
router.get('/login', (req, res) => {
 res.render('pages/main', {
   pagina: "login",
   logado: req.session.logado,
   dadosNotificacao: null,
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


router.get('/cursos', (req, res) => {
 res.render('pages/main', {
   pagina: "cursos",
   dados: null,
   dadosNotificacao: null,
   errorsList: null,
   logado: req.session.logado
 });
});

// CRIAR
router.get('/criar', (req, res) => {
 res.render('pages/main', {
   pagina: "create",
   dados: null,
   dadosNotificacao: null,
   errorsList: null,
   logado: req.session.logado
 });
});

// Envio do formulario
router.post("/criar", function (req, res) {
 mentoringController.addMentoring(req, res);
}
);

// PAGINA DE ADMINISTRAÇÃO MENTORAr
router.get('/paginadeadministracao', (req, res) => {
 console.log("Valor de mentoring na sessão:", req.session.latestMentoring); // Adiciona o console.log aqui
 res.render('pages/adm/usuaria/dashboard', { logado: req.session.logado, mentoring: req.session.latestMentoring,  dadosNotificacao: null, });
});

router.get(
  "/administrator",
  verifyAuthorizedUser([1], "pages/acessonegado"), // Middleware de verificação de autorização para o ID 1
  function (req, res) {
      res.render("pages/adm/administrator"); // Renderiza a página de administrador
  }
);



// router.post("/criar",  function (req, res) {
//   coursesController.addCourse(req, res);
// }
// );

router.get('/informacao_da_mentoria', (req, res) => {
  res.render('pages/main', { pagina: "mentoria_info", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/mapadosite', (req, res) => {
  res.render('pages/main', { pagina: "mapadosite", logado: req.session.logado, dadosNotificacao: null });
});

// MENTORIAS
router.get('/mentorias', (req, res) => {
  res.render('pages/main', { pagina: "mentorias", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/informacao_da_mentoria', (req, res) => {
  res.render('pages/main', { pagina: "mentoria_info", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/compras', (req, res) => {
  res.render('pages/main', { pagina: "comprados", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/privacidade', (req, res) => {
  res.render('pages/main', { pagina: "politicadeprivacidade", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/termosecondicoes', (req, res) => {
  res.render('pages/main', { pagina: "termos", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/quemsomos', (req, res) => {
  res.render('pages/main', { pagina: "quemsomos", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/chat', (req, res) => {
  res.render('pages/main', { pagina: "chat", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/carrinho', (req, res) => {
  res.render('pages/main', { pagina: "carrinho", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/finalizarcompra', (req, res) => {
  res.render('pages/main', { pagina: "finalizarcompra", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/pagamentopix', (req, res) => {
  res.render('pages/main', { pagina: "pagamentopix", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/sobreocurso', (req, res) => {
  res.render('pages/main', { pagina: "cursoinfo", logado: req.session.logado, dadosNotificacao: null });
});

router.get('/assistiraula', (req, res) => {
  res.render('pages/main', { pagina: "viewvideocourse", logado: req.session.logado, dadosNotificacao: null });
});



// router.post("/criar",  function (req, res) {
//   coursesController.addCourse(req, res);
// }
// );


// ROTA PARA CRIAR CURSO
// router.get('/criar-curso', (req, res) => {
//   res.render('pages/main', {
//     pagina: "create",
//     dados: null,
//     errorsList: null,
//     logado: req.session.logado
//   });
// });


// router.post("/criar", function (req, res) {
//   mentoringController.addMentoring(req, res);
// }
// );

// CURSOS

// router.get('/cursos', function (req, res) {
//   coursesController.listPaginatedCourses(req, res);
// });


module.exports = router;