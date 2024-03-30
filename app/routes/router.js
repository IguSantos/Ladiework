var express = require("express");
var router = express.Router();

router.get('/cursos', (req, res) => {
    res.render('pages/cursos'); 
  });
  
router.get("/", function (req, res) {
    res.render("pages/index" , {pagina:"home", logado:null});
});

module.exports = router;