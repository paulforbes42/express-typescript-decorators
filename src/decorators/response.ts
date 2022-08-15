import RequestParameterMetadata from "../types/request-parameter-metadata";

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
function Response<T>(): (target: T, propertyKey: string, parameterIndex: number) => void {
    return function (target: T, propertyKey: string, parameterIndex: number): void {
        const requestParams: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];

        requestParams[parameterIndex] = {
            key: 'response',
            mode: 'system',
        };

        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    }
}

export default Response;