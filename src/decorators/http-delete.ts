import HttpVerb from "../types/http-verb";

/**
 * Method decorator that indicates the method should be accessible through an HTTP Delete operation
 * @param path - URL which this method should be access through as a HTTP Delete operation
 * @param description - Description of this route to be included in the OpenAPI documentation
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 * 
 *  @HttpDelete('/user', 'Mark a user as deleted')
 *  async deleteUser(
 *    @RequestParam('userId') userId: number, 
 *    @Response() res: ExpressResponse
 *  ): Promise<void> { 
 *    ... 
 *  }
 * }
 * ```
 */
function HttpDelete<T>(path: string, description?: string): (target: T, propertyKey: string) => void {
    return function (target: T, propertyKey: string): void {
        Reflect.defineMetadata('etd:verb', HttpVerb.Delete, target, propertyKey);
        Reflect.defineMetadata('etd:path', path, target, propertyKey);

        if(description)
            Reflect.defineMetadata('etd:routeDescription', description, target, propertyKey);
    }
}

export default HttpDelete;