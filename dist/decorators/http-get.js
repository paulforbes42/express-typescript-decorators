"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpGet(path) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('httpVerb', 'get', target, propertyKey);
        Reflect.defineMetadata('path', path, target, propertyKey);
    };
}
exports.default = HttpGet;
