const express = require("express");
const app = express();
const path = require("path");
var moment = require('moment');
app.locals.moment = moment;

//importar as rotas
const adminRoute = require("./routes/admin/adminRoute");
const eventoRoute = require("./routes/admin/eventoRoute");
const loginRoute = require("./routes/admin/loginRoute");
const ministranteRoute = require("./routes/admin/ministranteRoute");
const noticiaRoute = require("./routes/admin/noticiaRoute");
const oficinaRoute = require("./routes/admin/oficinaRoute");
const palestraRoute = require("./routes/admin/palestraRoute");
const patrocinioRoute = require("./routes/admin/patrocinioRoute");
const publicRoute = require("./routes/public/publicRoute");

const porta = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", publicRoute);
app.use("/admin", adminRoute);
app.use("/evento", eventoRoute);
app.use("/login", loginRoute);
app.use("/ministrante", ministranteRoute);
app.use("/noticia", noticiaRoute);
app.use("/oficina", oficinaRoute);
app.use("/palestra", palestraRoute);
app.use("/patrocinio", patrocinioRoute);

app.listen(porta, () => {
  console.log("Servidor funcionando na porta: " + porta);
});
