import HttpVerb from "../types/http-verb";

/**
 * Method decorator that indicates the method should be accessible through an HTTP Post operation
 * @param path - URL which this method should be access through as a HTTP Post operation
 * @param description - Description of this route to be included in the OpenAPI documentation
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 * 
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
function HttpPost<T>(path: string, description?: string): (target: T, propertyKey: string) => void {
    return function (target: T, propertyKey: string): void {
        Reflect.defineMetadata('etd:verb', HttpVerb.Post, target, propertyKey);
        Reflect.defineMetadata('etd:path', path, target, propertyKey);

        if(description)
            Reflect.defineMetadata('etd:routeDescription', description, target, propertyKey);
    }
}

export default HttpPost;