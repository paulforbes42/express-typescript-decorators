import RequestParameterMetadata from "../types/request-parameter-metadata";

/**
 * Parameter decorator which defines a query string parameter to be provided to the Express route
 * 
 * @param key - name of parameter in the query string
 * @param summary - description of the parameter for OpenAPI documentation
 * @param exampleValue - example of expected data
 * @param required - indicate if this parameter is required
 * @param deprecated - indicate if this parameter is deprecated
 * @typeParam T - Class method to be registered with the Express application as a route
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 * 
 *  @HttpGet('/user', 'List users in the system')
 *  async listUsers(
 *    @Query('search', 'Search string to lookup users by first or last name', 'Paul', false, false) search: string,
 *    @Response() res: ExpressResponse
 *  ): Promise<void> { 
 *    ... 
 *  }
 * }
 * ```
 */
function Query<T>(key: string, summary?: string, exampleValue?: string | number | boolean | undefined, required?: boolean, deprecated?: boolean): (target: T, propertyKey: string, parameterIndex: number) => void  {
    return function (target: T, propertyKey: string, parameterIndex: number): void {
        const requestParams: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];
        const type = Reflect.getMetadata('design:paramtypes', target, propertyKey);

        requestParams[parameterIndex] = {
            key,
            summary,
            exampleValue,
            type: type[parameterIndex].name,
            required,
            deprecated,
            mode: 'query',
        };

        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    }
}

export default Query;