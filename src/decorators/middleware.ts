import {Request, Response, NextFunction} from 'express';

function Middleware<T>(middleware: (req: Request, res: Response, next?: NextFunction) => void[]): (target: T, propertyKey: string) => void {
    return function(target: T, propertyKey: string): void {
        Reflect.defineMetadata('middleware', middleware, target, propertyKey);
    }
}

export default Middleware;