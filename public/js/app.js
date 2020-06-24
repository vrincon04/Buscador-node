$(document).ready(function() {
    let Buscador = {
        $precio: $('#rangoPrecio'),
        $ciudad: $('#ciudad'),
        $tipo: $('#tipo'),
        $listado: $('.lista'),
        $buscar: $('#buscar'),
        $check: $('#checkPersonalizada'),
        $personalizado: $('#personalizada'),
        aplicaFiltro: false,
        baseUrl: window.location.protocol + '//' + window.location.hostname + ((window.location.port != '') ? ':' + window.location.port : ''),
        init: function() {
            this.obtenerCiudades();
            this.obtenerTipos();
            this.asignarEvento();
            this.enviarFiltro();
            this.$precio.ionRangeSlider({
                type: "double",
                grid: false,
                min: 0,
                max: 100000,
                from: 1000,
                to: 20000,
                prefix: "$"
            });
        },
        ajaxRequest: function(url, tipo, datos) {
            return $.ajax({
                url: url,
                type: tipo,
                data: datos
            })
        },
        asignarEvento: function() {
            let self = this;
            self.$buscar.on('click', (e) => {
                let presio = self.$precio.val().split(';');
                let filtros = `${ self.$ciudad.val() }/${ self.$tipo.val() }/${ presio[0] }/${ presio[1] }`;
                let endpoint = (self.aplicaFiltro === true) ? `datos/${ filtros }` : 'datos';
                
                self.obtenerDatos(endpoint, null);
            });
        },
        enviarFiltro: function() {
            let self = this;

            self.$check.on('change', (e) => {
                self.aplicaFiltro = !self.aplicaFiltro
                self.$personalizado.toggleClass('invisible');
            });
        },
        obtenerCiudades: function() {
            let self = this;
            self.ajaxRequest(`${ self.baseUrl }/ciudades`, 'GET', null)
                .done( (respuesta) => {
                    self.renderOption(respuesta.data, self.$ciudad);
                })
                .fail( (menesaje) => {
                    console.error(menesaje)
                });
        },
        obtenerTipos: function() {
            let self = this;
            self.ajaxRequest(`${self.baseUrl}/tipos`, 'GET', null)
                .done( (respuesta) => {
                    self.renderOption(respuesta.data, self.$tipo);
                })
                .fail( (menesaje) => {
                    console.error(menesaje)
                });
        },
        obtenerDatos: function (endpoint, datos) {
            let self = this;
            self.ajaxRequest(`${ self.baseUrl }/${ endpoint }`, 'GET', datos)
                .done( (respuesta) => {
                    self.$listado.html('');
                    self.renderCard(respuesta.data, self.$listado);
                })
                .fail( (menesaje) => {
                    console.error(menesaje)
                });
        },
        renderOption: function(arreglo, elemento) {
            arreglo.forEach( (valor) => {
                elemento.append(`<option value="${ valor }">${ valor }</option>`)
            });
            elemento.material_select();
        },
        renderCard: function(arreglo, elemento) {
            let self = this;
            arreglo.forEach( (valor) => {
                elemento.append(`<div class="card horizontal">
                <div class="card-image">
                    <img src="${ self.baseUrl }/img/home.jpg">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div> <p><strong>Direccion: </strong>${ valor.Direccion }</p> </div>
                        <div> <p><strong>Ciudad: </strong>${ valor.Ciudad }</p> </div>
                        <div> <p><strong>Telefono: </strong>${ valor.Telefono }</p> </div>
                        <div> <p><strong>Código postal: </strong>${ valor.Codigo_Postal }</p> </div>
                        <div> <p><strong>Precio: </strong>${ valor.Precio }</p> </div>
                        <div> <p><strong>Tipo: </strong>${ valor.Tipo }</p> </div>
                    </div>
                </div>
            </div>`);
            });
        }
    };

    Buscador.init();
});
