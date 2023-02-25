const {Op} = require('sequelize');
const models = require('../../database/models');
const Oficina = models.Oficina;

//função que lista todos ítens
async function lst(req, res) {
    const oficinas = await Oficina.findAll();
    res.render("admin/oficina/lst", {Oficinas: oficinas});
}
//função que lista todos ítens de acordo com pesquisa
async function filtro(req, res) {
    const oficinas = await Oficina.findAll({
        where:{
            nome:{
                [Op.iLike]: '%'+req.body.pesquisar + '%'
            }
        }
    });
    res.render("admin/oficina/lst", {Oficinas: oficinas});
}
//função que abre a tela de add
async function abreadd(req, res) {
    const ministrantes = await models.Ministrante.findAll({})
    const eventos = await models.Evento.findAll({})
    res.render("admin/oficina/add", {Eventos:eventos, Ministrantes:min});
}
//função que adiciona
async function add(req, res) {
    const oficina = await Oficina.create({
        nome: req.body.nome,
        proposta: req.body.proposta,
        ministranteId: req.body.ministranteId,
        eventoId: req.body.eventoId
    });
    res.redirect('/admin/oficina/lst');
}
//função que abre tela de edt
async function abreedt(req, res) {
    const ministrantes = await models.Ministrantes.findAll({});
    const eventos = await models.Eventos.findAll({})
    const oficina = await Oficina.findByPk(req.params.id);
    res.render("admin/oficina/edt", {Oficina:oficina, Eventos:eventos, Ministrantes:ministrantes});
}
//função que edita
async function edt(req, res) {
    const oficina = await Oficina.findByPk(req.params.id);
    await oficina.update({
        nome: req.body.nome,
        proposta: req.body.proposta,
        ministranteId: req.body.ministranteId,
        eventoId: req.body.eventoId
    }).catch(function(err){console.log(err);});
    res.redirect('/admin/oficina/lst');
}
//função que deleta ítens
async function del(req, res) {
    const oficina = await Oficina.findByPk(req.params.id);
    await oficina.destroy();
    res.redirect('/admin/oficina/lst');
}
module.exports = { lst, filtro, abreadd, add, abreedt, edt, del };

