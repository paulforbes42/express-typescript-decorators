"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class decorator used for classes that represent a grouping of Express routes
 *
 * @param path - URL path to prefix all Express routes within the class
 * @param tag - OpenAPI grouping for all Express routes within the class
 * @param description - OpenAPI description that will be associated with the tag for this class
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *  ...
 * }
 * ```
 */
function Controller(path, tag, description) {
    return function (constructor) {
        Reflect.defineMetadata('etd:path', path, constructor);
        Reflect.defineMetadata('etd:tags', tag, constructor);
        Reflect.defineMetadata('etd:description', description, constructor);
    };
}
exports.default = Controller;
