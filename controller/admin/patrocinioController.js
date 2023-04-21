const {Op} = require('sequelize');
const models = require('../../database/models');
const Patrocinios = models.Patrocinio;

//função que lista todos ítens
async function lst(req, res) {
    const patrocinios = await Patrocinio.findAll();
    res.render("admin/patrocinio/lst", {Logado:req.user, Patrocinios: patrocinios});
}
//função que lista todos ítens de acordo com pesquisa
async function filtro(req, res) {
    const patrocinios = await Patrocinio.findAll({
        where:{
            nome:{
                [Op.iLike]: '%'+req.body.pesquisar + '%'
            }
        }
    });
    res.render("admin/patrocinio/lst", {Logado:req.user, Patrocinios: patrocinios});
}
//função que abre a tela de add
async function abreadd(req, res) {
    res.render("admin/patrocinio/add", {logado:req.user, Eventos:eventos});
}
//função que adiciona
async function add(req, res) {
    const patrocinio = await Patrocinio.create({
        nome: req.body.nome,
        site: req.body.site,
        logo: req.file.filename,
        eventoId: req.body.eventoId
    });
    res.redirect('/admin/patrocinio/lst');
}
//função que abre tela de edt
async function abreedt(req, res) {
    const patrocinio = await Patrocinio.findByPk(req.params.id);
    res.render("admin/patrocinio/edt", {Logado:req.user, Patrocinio:patrocinio, Eventos:eventos});
}
//função que edita
async function edt(req, res) {
    const patrocinio = await Patrocinio.findByPk(req.params.id);
    await patrocinio.update({
        nome: req.body.nome,
        site: req.body.site,
        logo: req.file.filename,
        eventoId: req.body.eventoId
    });
    res.redirect('/admin/patrocinio/lst');
}
//função que deleta ítens
async function del(req, res) {
    const patrocinio = await Patrocinio.findByPk(req.params.id);
    await patrocinio.destroy();
    res.redirect('/admin/patrocinio/lst');
}
module.exports = { lst, filtro, abreadd, add, abreedt, edt, del };

