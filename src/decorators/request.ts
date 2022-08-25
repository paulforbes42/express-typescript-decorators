import RequestParameterMetadata from "../types/request-parameter-metadata";

/**
 * Parameter decorator which injects the Express Request object into the decorated Express route
 * 
 * @typeParam T - Class method to be registered with the Express application as a route
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
function Request<T>(): (target: T, propertyKey: string, parameterIndex: number) => void {
    return function (target: T, propertyKey: string, parameterIndex: number): void {
        const requestParams: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];

        requestParams[parameterIndex] = {
            key: 'request',
            mode: 'system',
        };

        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    }
}

export default Request;