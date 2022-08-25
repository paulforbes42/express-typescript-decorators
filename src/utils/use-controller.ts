import {Request, Response, Router} from 'express';
import path from 'path';
import OpenAPIService from '../services/open-api';
import HttpVerb from '../types/http-verb';
import RequestParameterMetadata from '../types/request-parameter-metadata';
import {OpenAPIParameterInList} from '../types/open-api-3-1-0';

/**
 * Utility Method to map a controller class be used by Express
 * 
 * @param controller - Controller class
 * @returns Express Router object with associated routes
 * @example
 * ```
 * app.use('/', useController(UserController));
 * ```
 */
function useController(controller: any): Router {
    const router = Router();

    const c = new controller();
    const members = Object.getOwnPropertyNames(controller.prototype);

    const controllerPath = Reflect.getMetadata('etd:path', controller);

    members.forEach(member => {
        if(member === 'constructor')
            return;

        const httpVerb = Reflect.getMetadata('etd:verb', c, member);
        const routePath = Reflect.getMetadata('etd:path', c, member);

        if(!httpVerb || !path)
            return;

        const middleware = Reflect.getMetadata('etd:middleware', c, member) || [];

        const routerMethod = async (req: Request, res: Response): Promise<void> => {
            const params: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', c, member) || [];
            const input: any[] = [];

            params.forEach((param: RequestParameterMetadata) => {
                if(param.key === 'request' && param.mode === 'system')
                    input.push(req);
                else if(param.key === 'response' && param.mode === 'system')
                    input.push(res);
                else if(param.mode === 'request')
                    input.push(req.body[param.key]);
                else if(param.mode === OpenAPIParameterInList.Query)
                    input.push(req.query[param.key]);
                else if(param.mode === OpenAPIParameterInList.Path)
                    input.push(req.params[param.key])
            })

            return await c[member](...input);
        };

        const fullPath = path.posix.join(controllerPath || '', routePath);
        switch(httpVerb) {
            case HttpVerb.Get:
                router.get(fullPath, middleware, routerMethod);
                break;
            case HttpVerb.Post:
                router.post(fullPath, middleware, routerMethod);
                break;
            case HttpVerb.Put:
                router.put(fullPath, middleware, routerMethod);
                break;
            case HttpVerb.Delete:
                router.delete(fullPath, middleware, routerMethod);
                break;
        }

        OpenAPIService.handleRoute(controller, c, member);
    });

    return router;
}

export default useController;