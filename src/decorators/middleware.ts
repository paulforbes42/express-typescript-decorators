import {MiddlewareFunction} from '../types/middleware-function';

/**
 * Method decorator which accepts an array of Express middleware callback functions to run prior to the Express route being executed
 * 
 * @param middleware - Array of Express middleware callback functions
 * @typeParam T - Class method to be registered with the Express application as a route
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 * 
 *  @Middleware([verifyAuthenticated, checkAdminPermissions])
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
function Middleware<T>(middleware: MiddlewareFunction[]): (target: T, propertyKey: string) => void {
    return function(target: T, propertyKey: string): void {
        Reflect.defineMetadata('etd:middleware', middleware, target, propertyKey);
    }
}

export default Middleware;