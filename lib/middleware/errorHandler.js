"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    res.status(500)
        .jsonp({
        error: true,
        status: 500,
        name: err.name,
        message: err.message,
    });
});
//# sourceMappingURL=errorHandler.js.map