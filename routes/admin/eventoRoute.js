const express = require("express");
const router = express.Router();
const upload = require("../../config/upload.js");
const eventoController = require("../../controller/admin/eventoController");

//rota para listar todos os eventos
router.get("/evento/lst", eventoController.lst);
//rota para listar todos eventos de acordo com uma pesquisa
router.post("/evento/lst", eventoController.filtro);
//rota para abrir a tela de adicionar evento
router.get("/evento/add", eventoController.abreadd);
//rota que adiciona o evento
router.post("/evento/add",
    upload.fields([
        {name: 'logo', maxCount: 1},
        {name: 'banner', maxCount: 1},
        {name: 'fotossobre', maxCount: 1}
    ]), eventoController.add);
//rota para abrir a tela de editar evento
router.get("/evento/edt", eventoController.abreedt);
//rota para editar o evento
router.post("/evento/edt/:id",
    upload.fields([
        {name: 'logo', maxCount: 1},
        {name: 'banner', maxCount: 1},
        {name: 'fotosobre', maxCount: 1}
    ]), eventoController.edt);
//rota para deletar evento
router.get("/evento/del:id", eventoController.del);

module.exports = router;
