const storage = require('../storage');
const helper = require('../../lib')

const routes = (app) => {
    app.get('/ciudades', (req, res) => {
        storage.getData()
            .then( (data) => {
                let tipos = helper.distinc(data, 'Tipo');
                res.status(200).json({
                    "error": false,
                    "message": "Success",
                    "data": tipos
                });
            })
            .catch( (error) => {
                res.status(500).json({ 
                    "error": true, 
                    "message": error 
                });
            });
    });

    app.get('/tipos', (req, res) => {
        storage.getData()
            .then( (data) => {
                let tipos = helper.distinc(data, 'Tipo');
                res.status(200).json({
                    "error": false,
                    "message": "Success",
                    "data": tipos
                });
            })
            .catch( (error) => {
                res.status(500).json({ 
                    "error": true, 
                    "message": error 
                });
            });
    });

    app.get('/datos/:ciudad/:tipo/:desde/:hasta', (req, res) => {
        let parametros = req.params;

        storage.getData()
            .then( (data) => {
                let result = data;
                if ( parametros.ciudad != '0' )
                    result = helper.where(result, 'Ciudad', parametros.ciudad);
                if ( parametros.tipo != '0' )
                    result = helper.where(result, 'Tipo', parametros.tipo);
                
                result = helper.between(result, 'Precio', parametros.desde, parametros.hasta);
                res.status(200).json({
                    "error": false,
                    "message": "Success",
                    "data": result
                });
            })
            .catch( (error) => {
                res.status(500).json({ 
                    "error": true, 
                    "message": error 
                });
            });
        
        
    });

    app.get('/datos', (req, res) => {
        storage.getData()
            .then( (data) => {
                res.status(200).json({
                    "error": false,
                    "message": "Success",
                    "data": data
                });
            })
            .catch( (error) => {
                res.status(500).json({ 
                    "error": true, 
                    "message": error 
                });
            });
    });
};

module.exports = routes;