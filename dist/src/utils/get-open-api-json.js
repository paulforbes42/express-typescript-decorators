"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const open_api_1 = __importDefault(require("../services/open-api"));
/**
 * Return an Express route which will render the OpenAPI documentation for the API in JSON format.
 * @returns Get API method
 * @example
 * ```
 * app.use('/api-docs', getOpenAPIJson());
 * ```
 */
function getOpenAPIJson() {
    return open_api_1.default.getOpenAPIJson();
}
exports.default = getOpenAPIJson;
