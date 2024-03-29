var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("../views/pages/index.js", {pagina:"home", logado:null});
});

module.exports = router;