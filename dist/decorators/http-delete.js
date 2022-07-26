"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpDelete(path) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('httpVerb', 'delete', target, propertyKey);
        Reflect.defineMetadata('path', path, target, propertyKey);
    };
}
exports.default = HttpDelete;
