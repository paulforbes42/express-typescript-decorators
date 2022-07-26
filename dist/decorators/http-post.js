"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpPost(path) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('httpVerb', 'post', target, propertyKey);
        Reflect.defineMetadata('path', path, target, propertyKey);
    };
}
exports.default = HttpPost;
