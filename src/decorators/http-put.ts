import HttpVerb from "../types/http-verb";

/**
 * Method decorator that indicates the method should be accessible through an HTTP Put operation
 * @param path - URL which this method should be access through as a HTTP Put operation
 * @param description - Description of this route to be included in the OpenAPI documentation
 * @typeParam T - Class method to be registered with the Express application as a put route
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
function HttpPut<T>(path: string, description?: string): (target: T, propertyKey: string) => void {
    return function (target: T, propertyKey: string): void {
        Reflect.defineMetadata('etd:verb', HttpVerb.Put, target, propertyKey);
        Reflect.defineMetadata('etd:path', path, target, propertyKey);

        if(description)
            Reflect.defineMetadata('etd:routeDescription', description, target, propertyKey);
    }
}

export default HttpPut;