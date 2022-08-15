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
const __1 = require("../..");
let UserController = class UserController {
    createUser(email, password, firstName, lastName, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    listUsers(active, nameSearch, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    (0, __1.RequestBody)('application/json', 'User information about the user to be added to the system', true),
    (0, __1.HttpResponse)(201, 'User Created'),
    (0, __1.HttpResponse)(400, 'Invalid Request Data'),
    (0, __1.HttpResponse)(403, 'Validation Failed'),
    (0, __1.HttpResponse)(409, 'Email Aready Exists'),
    (0, __1.HttpPost)('/', 'Create a new user'),
    __param(0, (0, __1.RequestParam)('email', 'User\'s email address', 'user@example.com', true)),
    __param(1, (0, __1.RequestParam)('password', 'Valid password', 'L1m1t3dAcc355', true)),
    __param(2, (0, __1.RequestParam)('firstName', 'User\'s first name', 'Paul', true)),
    __param(3, (0, __1.RequestParam)('lastName', 'User\'s last name', 'Forbes', true)),
    __param(4, (0, __1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, __1.HttpResponse)(200, 'Success'),
    (0, __1.HttpResponse)(500, 'Internal Error'),
    (0, __1.HttpGet)('/', 'List users in the system'),
    __param(0, (0, __1.Query)('active', 'Filter users by active status', 'true', false)),
    __param(1, (0, __1.Query)('name', 'Search users by first or last name', 'Forbes', false)),
    __param(2, (0, __1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listUsers", null);
UserController = __decorate([
    (0, __1.Controller)('/user', 'user', 'Create and manage users in the system')
], UserController);
exports.default = UserController;
