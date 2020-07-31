"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var ExpressServer = (function () {
    function ExpressServer(props) {
        var _this = this;
        this.listen = function () {
            _this.server.listen(_this.port, function () {
                console.log("server listening on port " + _this.port);
            });
        };
        this.loadRoutes = function (routes) {
            var e_1, _a;
            try {
                for (var routes_2 = __values(routes), routes_2_1 = routes_2.next(); !routes_2_1.done; routes_2_1 = routes_2.next()) {
                    var route = routes_2_1.value;
                    console.info("loading route " + route.name + " at " + route.head);
                    var expressRoute = new routes_1.Route(route);
                    _this.server.use(route.head, expressRoute.router);
                    console.info("finished loading " + route.name + " at " + route.head);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (routes_2_1 && !routes_2_1.done && (_a = routes_2.return)) _a.call(routes_2);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.info("finished loading " + routes.length + " routes.");
        };
        this.loadMiddleware = function (middleware) {
            var e_2, _a;
            try {
                for (var middleware_1 = __values(middleware), middleware_1_1 = middleware_1.next(); !middleware_1_1.done; middleware_1_1 = middleware_1.next()) {
                    var mw = middleware_1_1.value;
                    _this.server.use(mw);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (middleware_1_1 && !middleware_1_1.done && (_a = middleware_1.return)) _a.call(middleware_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        this.server = express_1.default();
        this.port = props.port;
        this.loadMiddleware(props.middleware);
        this.loadRoutes(props.routes);
        if (props.errorHandler)
            this.loadMiddleware(props.errorHandler);
    }
    return ExpressServer;
}());
exports.default = ExpressServer;
//# sourceMappingURL=index.js.map