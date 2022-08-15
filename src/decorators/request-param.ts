import RequestParameterMetadata from "../types/request-parameter-metadata";

/**
 * Parameter decorator which defines a request body parameter to be provided to the Express route
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
function RequestParam<T>(key: string, summary?: string, exampleValue?: string | number | boolean | undefined, required?: boolean): (target: T, propertyKey: string, parameterIndex: number) => void {
    return function (target: T, propertyKey: string, parameterIndex: number): void {
        const requestParams: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', target, propertyKey) || [];
        const type = Reflect.getMetadata('design:paramtypes', target, propertyKey);

        requestParams[parameterIndex] = {
            key,
            summary,
            exampleValue,
            type: type[parameterIndex].name,
            required,
            mode: 'request',
        };

        Reflect.defineMetadata('etd:requestParams', requestParams, target, propertyKey);
    }
}

export default RequestParam;