"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method decorator which accepts an array of Express middleware callback functions to run prior to the Express route being executed
 *
 * @param middleware - Array of Express middleware callback functions
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
function Middleware(middleware) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('etd:middleware', middleware, target, propertyKey);
    };
}
exports.default = Middleware;
