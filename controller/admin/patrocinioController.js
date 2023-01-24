const {Op} = require('sequelize');
const models = require('../../database/models');
const Patrocinios = models.Patrocinio;

//função que lista todos ítens
async function lst(req, res) {
    const patrocinios = await Patrocinio.findAll();
    res.render("admin/patrocinio/lst", {Patrocinios: patrocinios});
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
    res.render("admin/patrocinio/lst", {Patrocinios: patrocinios});
}
//função que abre a tela de add
async function abreadd(req, res) {
    res.render("admin/patrocinio/add");
}
//função que adiciona
async function add(req, res) {
    const patrocinio = await Patrocinio.create({
        nome: req.body.nome,
        frase: req.body.frase,
        sobre: req.body.sobre,
        local: req.body.local,
        datainicio: req.body.datainicio,
        datafim: req.body.datafim,
        logo: req.files.logo[0].filename,
        banner: req.files.banner[0].filename,
        fotosobre: req.file.fotosobre[0].filename,
    });
    res.redirect('/admin/patrocinio/lst');
}
//função que abre tela de edt
async function abreedt(req, res) {
    const patrocinio = await Patrocinio.findByPk(req.params.id);
    res.render("admin/patrocinio/edt", {Patrocinio:patrocinio});
}
//função que edita
async function edt(req, res) {
    const patrocinio = await Patrocinio.findByPk(req.params.id);
    await patrocinio.update({
        nome: req.body.nome,
        frase: req.body.frase,
        sobre: req.body.sobre,
        local: req.body.local,
        datainicio: req.body.datainicio,
        datafim: req.body.datafim,
        logo: req.files['logo'].filename,
        banner: req.files['banner'].filename,
        fotosobre: req.files['fotosobre'].filename,
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

