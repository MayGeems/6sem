const express = require("express");
const router = express.Router();
const ministranteController = require("../../controller/admin/ministranteController");
const upload = require("../../config/upload");

//rota para listar todos os ministrantes
router.get("/ministrante/lst", ministranteController.lst);
//rota para listar todos ministrantes de acordo com uma pesquisa
router.post("/ministrante/lst", ministranteController.filtro);
//rota para abrir a tela de adicionar ministrante
router.get("/ministrante/add", ministranteController.abreadd);
//rota que adiciona o ministrante
router.post("/ministrante/add", 
    upload.fields([
        {name: 'fotoperfil', maxCount:1}
    ]), ministranteController.add);
//rota para abrir a tela de editar ministrante
router.get("/ministrante/edt/:id", ministranteController.abreedt);
//rota para editar o ministrante
router.post("/ministrante/edt/:id",
    upload.fields([
        {name: 'fotoperfil', maxCount:1},
    ]), ministranteController.edt);
//rota para deletar ministrante
router.get("/ministrante/del/:id", ministranteController.del);

module.exports = router;
