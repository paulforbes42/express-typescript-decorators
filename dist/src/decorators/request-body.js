"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method decorator to describe the expected request payload
 *
 * @param contentType - content type of payload i.e. "application/json"
 * @param description - description of the payload for OpenAPI documentation
 * @param required - indicate if the payload is required
 * @example
 * ```
 *  * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @RequestBody('application/json', 'User information for new user record', true)
 *  @HttpPost('/user', 'Create a new user')
 *  async createUser(
 *    @RequestParam('username') username: string,
 *    @RequestParam('password') password: string,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> {
 *    ...
 *  }
 * }

 * ```
 */
function RequestBody(contentType, description, required) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('etd:requestBody', { contentType, description, required }, target, propertyKey);
    };
}
exports.default = RequestBody;
