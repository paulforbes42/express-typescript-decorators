"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method decorator which describes an HTTP status code that can be returned by this Express route.
 * This decorator can be applied multiple times to a single Express route to describe all status codes produced by this route.
 *
 * @param statusCode - HTTP status code
 * @param description - Description of the scenario in which this HTTP status code will be produced
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *
 *  @HttpResponse(201, 'New user record created')
 *  @HttpResponse(400, 'Missing required data')
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
function HttpResponse(statusCode, description) {
    return function (target, propertyKey) {
        const statuses = Reflect.getMetadata('etd:httpStatus', target, propertyKey) || [];
        statuses.push({
            statusCode,
            description
        });
        Reflect.defineMetadata('etd:httpStatus', statuses, target, propertyKey);
    };
}
exports.default = HttpResponse;
