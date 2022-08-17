"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parameter decorator which defines a url parameter to be provided to the Express route
 *
 * @param key - name of parameter in request body
 * @param summary - description of the parameter for OpenAPI documentation
 * @param exampleValue - example of expected data
 * @param required - indicate if this parameter is required
 * @param deprecated - indicate if this parameter is deprecated
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
function UrlParam(key, summary, exampleValue) {
    return function (target, propertyKey, parameterIndex) {
        const requestParams = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];
        const type = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        requestParams[parameterIndex] = {
            key,
            summary,
            exampleValue,
            type: type[parameterIndex].name,
            required: true,
            mode: 'path',
        };
        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    };
}
exports.default = UrlParam;
