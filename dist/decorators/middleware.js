"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Middleware(middleware) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('middleware', middleware, target, propertyKey);
    };
}
exports.default = Middleware;
