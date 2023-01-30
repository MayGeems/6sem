const {Op} = require('sequelize');
const models = require('../../database/models');
const Noticias = models.Noticia;

//função que lista todos ítens
async function lst(req, res) {
    const noticias = await Noticia.findAll();
    res.render("admin/noticia/lst", {Noticias: noticias});
}
//função que lista todos ítens de acordo com pesquisa
async function filtro(req, res) {
    const noticias = await Noticia.findAll({
        where:{
            titulo:{
                [Op.iLike]: '%'+req.body.pesquisar + '%'
            }
        }
    });
    res.render("admin/noticia/lst", {Noticias: noticias});
}
//função que abre a tela de add
async function abreadd(req, res) {
    const eventos = await models.Evento.findAll({});
    res.render("admin/noticia/add", {Eventos:eventos});
}
//função que adiciona
async function add(req, res) {
    const noticia = await Noticia.create({
        titulo:req.body.titulo,
        noticia:req.body.noticia,
        foto:req.file.filename,
        data:req.body.data,
        eventoId:req.body.eventoId
    });
    res.redirect('/admin/noticia/lst');
}
//função que abre tela de edt
async function abreedt(req, res) {
    const eventos = await models.Evento.findAll({});
    const noticia = await Noticia.findByPk(req.params.id);
    res.render("admin/noticia/edt", {Noticia:noticia, Eventos:eventos});
}
//função que edita
async function edt(req, res) {
    const noticia = await Noticia.findByPk(req.params.id);
    await noticia.update({
        titulo:req.body.titulo,
        noticia:req.body.noticia,
        foto:req.file.filename,
        data:req.body.data,
        eventoId:req.body.eventoId
    });
    res.redirect('/admin/noticia/lst');
}
//função que deleta ítens
async function del(req, res) {
    const noticia = await Noticia.findByPk(req.params.id);
    await noticia.destroy();
    res.redirect('/admin/noticia/lst');
}
module.exports = { lst, filtro, abreadd, add, abreedt, edt, del };
