import {Request, Response, Router} from 'express';

function useController(controller: any): Router {
    const router = Router();

    const c = new controller();
    const members = Object.getOwnPropertyNames(controller.prototype);

    members.forEach(member => {
        if(member === 'constructor')
            return;

        const httpVerb = Reflect.getMetadata('httpVerb', c, member);
        const path = Reflect.getMetadata('path', c, member);
        const middleware = Reflect.getMetadata('middleware', c, member) || [];

        if(!httpVerb || !path)
            return;

        const routerMethod = async (req: Request, res: Response): Promise<void> => {
            return await c[member](req, res);
        }
        switch(httpVerb) {
            case 'get':
                router.get(path, middleware, routerMethod);
                break;
            case 'post':
                router.post(path, middleware, routerMethod);
                break;
            case 'put':
                router.put(path, middleware, routerMethod);
                break;
            case 'delete':
                router.delete(path, middleware, routerMethod);
                break;
        }
    });

    return router;
}

export default useController;