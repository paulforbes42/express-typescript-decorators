"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_verb_1 = __importDefault(require("../types/http-verb"));
/**
 * Method decorator that indicates the method should be accessible through an HTTP Put operation
 * @param path - URL which this method should be access through as a HTTP Put operation
 * @param description - Description of this route to be included in the OpenAPI documentation
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @HttpPut('/user/:userId', 'Update an existing user')
 *  async createUser(
 *    @UrlParam('userId') userId: number,
 *    @RequestParam('password') password: string,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> {
 *    ...
 *  }
 * }
 * ```
 */
function HttpPut(path, description) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('etd:verb', http_verb_1.default.Put, target, propertyKey);
        Reflect.defineMetadata('etd:path', path, target, propertyKey);
        if (description)
            Reflect.defineMetadata('etd:routeDescription', description, target, propertyKey);
    };
}
exports.default = HttpPut;
