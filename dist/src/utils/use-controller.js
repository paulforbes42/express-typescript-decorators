"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const open_api_1 = __importDefault(require("../services/open-api"));
const http_verb_1 = __importDefault(require("../types/http-verb"));
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
function useController(controller) {
    const router = (0, express_1.Router)();
    const c = new controller();
    const members = Object.getOwnPropertyNames(controller.prototype);
    const controllerPath = Reflect.getMetadata('etd:path', controller);
    members.forEach(member => {
        if (member === 'constructor')
            return;
        const httpVerb = Reflect.getMetadata('etd:verb', c, member);
        const routePath = Reflect.getMetadata('etd:path', c, member);
        if (!httpVerb || !path_1.default)
            return;
        const middleware = Reflect.getMetadata('etd:middleware', c, member) || [];
        const routerMethod = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = Reflect.getMetadata('etd:requestParams', c, member) || [];
            const input = [];
            params.forEach((param) => {
                if (param.key === 'request' && param.mode === 'system')
                    input.push(req);
                else if (param.key === 'response' && param.mode === 'system')
                    input.push(res);
                else if (param.mode === 'request')
                    input.push(req.body[param.key]);
                else if (param.mode === 'query')
                    input.push(req.query[param.key]);
                else if (param.mode === 'path')
                    input.push(req.params[param.key]);
            });
            return yield c[member](...input);
        });
        const fullPath = path_1.default.posix.join(controllerPath || '', routePath);
        switch (httpVerb) {
            case http_verb_1.default.Get:
                router.get(fullPath, middleware, routerMethod);
                break;
            case http_verb_1.default.Post:
                router.post(fullPath, middleware, routerMethod);
                break;
            case http_verb_1.default.Put:
                router.put(fullPath, middleware, routerMethod);
                break;
            case http_verb_1.default.Delete:
                router.delete(fullPath, middleware, routerMethod);
                break;
        }
        open_api_1.default.handleRoute(controller, c, member);
    });
    return router;
}
exports.default = useController;
