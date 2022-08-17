"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parameter decorator which injects the Express Response object into the decorated route
 *
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @HttpGet('/user', 'List users in the system')
 *  async listUsers(
 *    @Query('search') search: string,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> {
 *    ...
 *  }
 * }
 * ```
 */
function Response() {
    return function (target, propertyKey, parameterIndex) {
        const requestParams = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];
        requestParams[parameterIndex] = {
            key: 'response',
            mode: 'system',
        };
        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    };
}
exports.default = Response;
