/**
 * Class decorator used for classes that represent a grouping of Express routes
 * 
 * @param path - URL path to prefix all Express routes within the class
 * @param tag - OpenAPI grouping for all Express routes within the class
 * @param description - OpenAPI description that will be associated with the tag for this class
 * @typeParam T - Class which has methods that are to be routes in the Express Application
 * @example
 * ```
 * @Controller('/api', 'User', 'User Management Routes')
 * class User {
 *  ...
 * }
 * ```
 */
function Controller<T>(path?: string, tag?: string, description?: string): (constructor: T) => void {
    return function (constructor: T): void {
        Reflect.defineMetadata('etd:path', path, constructor);
        Reflect.defineMetadata('etd:tags', tag, constructor);
        Reflect.defineMetadata('etd:description', description, constructor);
    }
}

export default Controller;