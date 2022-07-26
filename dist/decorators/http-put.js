"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpPut(path) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('httpVerb', 'put', target, propertyKey);
        Reflect.defineMetadata('path', path, target, propertyKey);
    };
}
exports.default = HttpPut;
