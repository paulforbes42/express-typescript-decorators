"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const index_1 = require("../../index");
let HelloWorldController = class HelloWorldController {
    constructor() {
        this.text = 'Hello, World!';
    }
    helloWorld(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(this.text);
        });
    }
    helloWorld2(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(this.text + ' 2x');
        });
    }
};
__decorate([
    (0, index_1.HttpGet)('/', 'Get a Hello World'),
    (0, index_1.HttpResponse)(200, 'Success'),
    __param(0, (0, index_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelloWorldController.prototype, "helloWorld", null);
__decorate([
    (0, index_1.HttpGet)('/second', 'Get another Hello World'),
    (0, index_1.HttpResponse)(200, 'Success'),
    __param(0, (0, index_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelloWorldController.prototype, "helloWorld2", null);
HelloWorldController = __decorate([
    (0, index_1.Controller)()
], HelloWorldController);
exports.default = HelloWorldController;