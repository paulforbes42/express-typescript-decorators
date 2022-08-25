/**
 * Method decorator to describe the expected request payload
 * 
 * @param contentType - content type of payload i.e. "application/json"
 * @param description - description of the payload for OpenAPI documentation
 * @param required - indicate if the payload is required
 * @typeParam T - Class method to be registered with the Express application as a route
 * @example
 * ```
 *  * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @RequestBody('application/json', 'User information for new user record', true) 
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
function RequestBody<T>(contentType: string, description?: string, required?: boolean): (target: T, propertyKey: string) => void {
    return function (target: T, propertyKey: string): void {
        Reflect.defineMetadata('etd:requestBody', {contentType, description, required}, target, propertyKey);
    }
}

export default RequestBody;