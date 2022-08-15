"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const open_api_1 = __importDefault(require("../services/open-api"));
function setOpenAPIJsonPath(path) {
    open_api_1.default.setOpenAPIJsonPath(path);
}
exports.default = setOpenAPIJsonPath;
