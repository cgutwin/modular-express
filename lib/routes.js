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
exports.Route = void 0;
var express_1 = __importDefault(require("express"));
var Route = (function () {
    function Route(route) {
        var _this = this;
        this.create = function (routes) {
            var e_1, _a;
            try {
                for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                    var route = routes_1_1.value;
                    console.info("> " + route.method + " ." + route.path);
                    switch (route.method) {
                        case "POST":
                            _this.router.post(route.path, route.controller);
                            break;
                        case "GET":
                            _this.router.get(route.path, route.controller);
                            break;
                        default:
                            console.warn("No method provided on route " + route.path);
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _this.router;
        };
        this.loadMiddleware = function (middleware) {
            var e_2, _a;
            if (middleware) {
                console.info("loading middleware on route " + _this.meta.head);
                try {
                    for (var middleware_1 = __values(middleware), middleware_1_1 = middleware_1.next(); !middleware_1_1.done; middleware_1_1 = middleware_1.next()) {
                        var mw = middleware_1_1.value;
                        _this.router.use(mw);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (middleware_1_1 && !middleware_1_1.done && (_a = middleware_1.return)) _a.call(middleware_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                console.info("loaded " + middleware.length + " middleware on " + _this.meta.head);
            }
        };
        this.router = express_1.default.Router();
        this.meta = route;
        this.loadMiddleware(route.middleware);
        this.create(route.paths);
    }
    return Route;
}());
exports.Route = Route;
//# sourceMappingURL=routes.js.map