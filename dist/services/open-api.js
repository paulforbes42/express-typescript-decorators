"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const open_api_3_1_0_1 = require("../types/open-api-3-1-0");
/**
 * Internal class to manage and generate OpenAPI documentation.
 */
class OpenAPIService {
    static getOpenAPIPath(path) {
        const openAPIData = this.openAPIData;
        if (!openAPIData.paths)
            openAPIData.paths = {};
        if (!openAPIData.paths[path])
            openAPIData.paths[path] = {};
        return openAPIData.paths[path];
    }
    static addHttpVerbToPathItem(openAPIPath, httpVerb, httpStatus, routeDescription, tag) {
        if (!openAPIPath[httpVerb])
            openAPIPath[httpVerb] = {};
        const openAPIOperation = openAPIPath[httpVerb];
        if (routeDescription)
            openAPIOperation.description = routeDescription;
        if (tag)
            openAPIOperation.tags = [tag];
        httpStatus.forEach((status) => {
            if (!openAPIOperation.responses)
                openAPIOperation.responses = {};
            openAPIOperation.responses[status.statusCode] = {};
            const openAPIResponse = openAPIOperation.responses[status.statusCode];
            openAPIResponse.description = status.description;
        });
        return openAPIOperation;
    }
    static addRequestBodyToOperation(openAPIOperation, requestBody, requestParams) {
        openAPIOperation.requestBody = {
            description: requestBody.description,
            content: {},
        };
        const openAPIRequestBody = openAPIOperation.requestBody;
        requestParams.forEach(param => {
            if (param.mode === 'system' || param.mode === 'query')
                return;
            if (!openAPIRequestBody.content[requestBody.contentType])
                openAPIRequestBody.content[requestBody.contentType] = {};
            const openAPIMediaType = openAPIRequestBody.content[requestBody.contentType];
            if (!openAPIMediaType.schema)
                openAPIMediaType.schema = {
                    type: 'object',
                };
            const openAPISchema = openAPIMediaType.schema;
            if (!openAPISchema.properties)
                openAPISchema.properties = {};
            openAPISchema.properties[param.key] = {
                type: param.type,
            };
            if (param.exampleValue && !openAPISchema.example) {
                openAPISchema.example = {};
            }
            if (param.exampleValue)
                openAPISchema.example[param.key] = param.exampleValue;
            if (param.required && !openAPISchema.required)
                openAPISchema.required = [];
            if (param.required && openAPISchema.required)
                openAPISchema.required.push(param.key);
        });
    }
    static addPathParamsToOperation(openAPIOperation, requestParams) {
        requestParams.forEach(param => {
            var _a;
            if (param.mode !== 'query' && param.mode !== 'path')
                return;
            const pathParam = {
                name: param.key,
                in: param.mode === 'path' ? open_api_3_1_0_1.OpenAPIParameterInList.Path : open_api_3_1_0_1.OpenAPIParameterInList.Query,
                description: param.summary,
                required: param.required || false,
                schema: {
                    type: (_a = param.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()
                }
            };
            if (!openAPIOperation.parameters)
                openAPIOperation.parameters = [pathParam];
            else
                openAPIOperation.parameters.push(pathParam);
        });
    }
    static parseOpenAPIJsonConfig() {
        if (!this.openAPIJsonPath && require.main) {
            const baseDir = (0, path_1.dirname)(require.main.filename);
            this.openAPIJsonPath = path_1.default.join(baseDir, 'OpenAPI.json');
        }
        if (!fs_1.default.existsSync(this.openAPIJsonPath))
            return;
        const fileContent = JSON.parse(fs_1.default.readFileSync(this.openAPIJsonPath, 'utf-8'));
        if (fileContent.info)
            this.openAPIData.info = fileContent.info;
        if (fileContent.servers)
            this.openAPIData.servers = fileContent.servers;
        if (fileContent.webhooks)
            this.openAPIData.webhooks = fileContent.webhooks;
        if (fileContent.components)
            this.openAPIData.components = fileContent.components;
        if (fileContent.security)
            this.openAPIData.security = fileContent.security;
        if (fileContent.tags)
            this.openAPIData.tags = fileContent.tags;
        if (fileContent.externalDocs)
            this.openAPIData.externalDocs = fileContent.externalDocs;
    }
    static addGlobalTag(tag, description) {
        if (!this.openAPIData.tags)
            this.openAPIData.tags = [];
        for (let i = 0, len = this.openAPIData.tags.length; i < len; ++i) {
            if (this.openAPIData.tags[i].name === tag)
                return;
        }
        this.openAPIData.tags.push({
            name: tag,
            description,
        });
    }
    static handleRoute(controller, controllerInstance, methodName) {
        const controllerPath = Reflect.getMetadata('etd:path', controller);
        const controllerTags = Reflect.getMetadata('etd:tags', controller);
        const controllerDescription = Reflect.getMetadata('etd:description', controller);
        const httpVerb = Reflect.getMetadata('etd:verb', controllerInstance, methodName);
        const routePath = Reflect.getMetadata('etd:path', controllerInstance, methodName);
        const httpStatus = Reflect.getMetadata('etd:httpStatus', controllerInstance, methodName) || [];
        const routeDescription = Reflect.getMetadata('etd:routeDescription', controllerInstance, methodName);
        const requestBody = Reflect.getMetadata('etd:requestBody', controllerInstance, methodName);
        const requestParams = Reflect.getMetadata('etd:requestParams', controllerInstance, methodName) || [];
        const fullPath = path_1.default.posix.join(controllerPath || '', routePath);
        const openAPIPath = this.getOpenAPIPath(fullPath);
        const openAPIOperation = this.addHttpVerbToPathItem(openAPIPath, httpVerb, httpStatus, routeDescription, controllerTags);
        if (requestBody)
            this.addRequestBodyToOperation(openAPIOperation, requestBody, requestParams);
        this.addPathParamsToOperation(openAPIOperation, requestParams);
        if (controllerTags && controllerDescription)
            this.addGlobalTag(controllerTags, controllerDescription);
    }
    static getOpenAPIJson() {
        this.parseOpenAPIJsonConfig();
        return (req, res) => {
            res.send(this.openAPIData);
        };
    }
    static setOpenAPIInfo(info) {
        this.openAPIData.info = info;
    }
    static setOpenAPITags(tags) {
        tags.forEach(tag => {
            if (!this.openAPIData.tags)
                this.openAPIData.tags = [];
            if (typeof tag === 'string')
                this.openAPIData.tags.push({
                    name: tag,
                });
            else
                this.openAPIData.tags.push(tag);
        });
    }
    static setOpenAPIJsonPath(path) {
        this.openAPIJsonPath = path;
    }
    static reset() {
        this.openAPIData = {
            openapi: "3.0.1",
            info: {
                title: "General API",
                version: "1"
            }
        };
    }
}
OpenAPIService.openAPIJsonPath = '';
OpenAPIService.openAPIData = {
    openapi: "3.0.1",
    info: {
        title: "General API",
        version: "1"
    }
};
exports.default = OpenAPIService;
