"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parameter decorator which injects the Express Request object into the decorated Express route
 *
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @HttpGet('/user', 'List users in the system')
 *  async listUsers(
 *    @Query('search') search: string,
 *    @Request() req: ExpressRequest,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> {
 *    ...
 *  }
 * }
 * ```

 */
function Request() {
    return function (target, propertyKey, parameterIndex) {
        const requestParams = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];
        requestParams[parameterIndex] = {
            key: 'request',
            mode: 'system',
        };
        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    };
}
exports.default = Request;
