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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function useController(controller) {
    const router = (0, express_1.Router)();
    const c = new controller();
    const members = Object.getOwnPropertyNames(controller.prototype);
    members.forEach(member => {
        if (member === 'constructor')
            return;
        const httpVerb = Reflect.getMetadata('httpVerb', c, member);
        const path = Reflect.getMetadata('path', c, member);
        const middleware = Reflect.getMetadata('middleware', c, member) || [];
        if (!httpVerb || !path)
            return;
        const routerMethod = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return yield c[member](req, res);
        });
        switch (httpVerb) {
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
exports.default = useController;
