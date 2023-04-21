const {Op} = require('sequelize');
const models = require('../../database/models');
const Palestras = models.Palestra;

//função que lista todos ítens
async function lst(req, res) {
    const palestras = await Palestra.findAll();
    res.render("admin/palestra/lst", {Logado:req.user, Palestras: palestras});
}
//função que lista todos ítens de acordo com pesquisa
async function filtro(req, res) {
    const palestras = await Palestra.findAll({
        where:{
            titulo:{
                [Op.iLike]: '%'+req.body.pesquisar + '%'
            }
        }
    });
    res.render("admin/palestra/lst", {Logado:req.user, Palestras: palestras});
}
//função que abre a tela de add
async function abreadd(req, res) {
    const eventos = await models.Evento.findAll();
    const ministrantes = await models.Ministrante.findAll();
    res.render("admin/palestra/add", {Logado:req.user, Eventos:eventos, Ministrantes:ministrantes});
}
//função que adiciona
async function add(req, res) {
    const palestra = await Palestra.create({
        titulo: req.body.titulo,
        resumo: req.body.resumo,
        data: req.body.data,
        eventoId: req.body.eventoId
    });
    let arr;
    if(Array.isArray(req.body.ministranteId)){
        arr = req.body.ministranteId;
    }else{
        arr = [...[req.body.ministranteId]];
    }    

    arr.forEach(async function (id) {
        const ministrante = await models.Ministrante.findByPk(id)
        await palestra.addMinistrante(ministrante);
    });
    res.redirect('/admin/palestra/lst');
}
//função que abre tela de edt
async function abreedt(req, res) {
    const eventos = await models.Evento.findAll();
    const ministrantes = await models.Ministrantes.findAll();
    const palestra = await Palestra.findByPk(req.params.id, {include: 'ministrantes'});
    res.render("admin/palestra/edt", {Logado:req.user, Palestra:palestra, Eventos:eventos, Ministrantes:ministrantes});
}
//função que edita
async function edt(req, res) {
    const palestra = await Palestra.findByPk(req.params.id, {include: 'ministrantes'});
    await palestra.update({
        resumo: req.body.resumo,
        titulo: req.body.titulo,
        data: req.body.data,
        eventoId: req.body.eventoId
    })
    let arr;
    if(Array.isArray(req.body.ministranteId)){
        arr = req.body.ministranteId;
    }else{
        arr = [...[req.body.ministranteId]];
    }    
    await palestra.removeMinistrantes(palestra.ministrantes)
    arr.forEach(async function (id) {
        const ministrante = await models.Ministrante.findByPk(id)
        await palestra.addMinistrante(ministrante);
    });
    res.redirect('/admin/palestra/lst');
}
//função que deleta ítens
async function del(req, res) {
    const palestra = await Palestra.findByPk(req.params.id);
    await palestra.destroy();
    res.redirect('/admin/palestra/lst');
}
module.exports = { lst, filtro, abreadd, add, abreedt, edt, del };
