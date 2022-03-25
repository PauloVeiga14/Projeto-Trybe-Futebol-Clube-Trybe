"use strict";
exports.__esModule = true;
exports.app = exports.App = void 0;
var express = require("express");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.config();
    }
    App.prototype.config = function () {
        var accessControl = function (_req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(express.json());
        this.app.route('/login').post(); // Rota Inicial do Login. Resta incluir validaçõs e controles.
    };
    App.prototype.start = function (PORT) {
        this.app.listen(PORT);
    };
    return App;
}());
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
