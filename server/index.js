// Sección de importación
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const route = require('./routers')

// Variables globales.
const port = process.env.PORT ||  3000;
const app = express();
const server = http.createServer(app);

route(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

console.info(">> Iniciando servidor");
server.listen(port, () => {
    console.log(`>> Escuchando en http://localhost:${port}`);
});