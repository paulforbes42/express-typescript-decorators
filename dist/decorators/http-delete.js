"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_verb_1 = __importDefault(require("../types/http-verb"));
/**
 * Method decorator that indicates the method should be accessible through an HTTP Delete operation
 * @param path - URL which this method should be access through as a HTTP Delete operation
 * @param description - Description of this route to be included in the OpenAPI documentation
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @HttpDelete('/user', 'Mark a user as deleted')
 *  async deleteUser(
 *    @RequestParam('userId') userId: number,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> {
 *    ...
 *  }
 * }
 * ```
 */
function HttpDelete(path, description) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('etd:verb', http_verb_1.default.Delete, target, propertyKey);
        Reflect.defineMetadata('etd:path', path, target, propertyKey);
        if (description)
            Reflect.defineMetadata('etd:routeDescription', description, target, propertyKey);
    };
}
exports.default = HttpDelete;
