import {Request, Response} from 'express';
import path, {dirname} from 'path';
import fs from 'fs';
import {
    OpenAPI,
    OpenAPIPathItem,
    OpenAPIOperation,
    OpenAPIResponse,
    OpenAPIRequestBody,
    OpenAPIMediaType,
    OpenAPISchema,
    OpenAPIInfo,
    OpenAPITag,
    OpenAPIParameter,
    OpenAPIParameterInList,
} from '../types/open-api-3-1-0';
import ContentType from '../types/content-type';
import HttpStatus from '../types/http-status';
import HttpVerb from '../types/http-verb';
import RequestParameterMetadata from '../types/request-parameter-metadata';

/**
 * Internal class to manage and generate OpenAPI documentation.
 */
class OpenAPIService {
    protected static openAPIJsonPath = '';
    protected static openAPIData: OpenAPI = {
        openapi: "3.0.1",
        info: {
            title: "General API",
            version: "1"
        }
    };
    
    protected static getOpenAPIPath(path: string): OpenAPIPathItem {
        const openAPIData = this.openAPIData;

        if(!openAPIData.paths)
            openAPIData.paths = {};

        if(!openAPIData.paths[path])
            openAPIData.paths[path] = {};

        return openAPIData.paths[path];
    }

    protected static addHttpVerbToPathItem(openAPIPath: OpenAPIPathItem, httpVerb: HttpVerb, httpStatus: HttpStatus[], routeDescription: string, tag?: string): OpenAPIOperation {
        if(!openAPIPath[httpVerb])
            openAPIPath[httpVerb] = {};

        const openAPIOperation: OpenAPIOperation = openAPIPath[httpVerb] as OpenAPIOperation;

        if(routeDescription)
            openAPIOperation.description = routeDescription;

        if(tag)
            openAPIOperation.tags = [tag];

        httpStatus.forEach((status: HttpStatus) => {
            if(!openAPIOperation.responses)
                openAPIOperation.responses = {};

            openAPIOperation.responses[status.statusCode] = {} as OpenAPIResponse;
            const openAPIResponse: OpenAPIResponse = openAPIOperation.responses[status.statusCode] as OpenAPIResponse;

            openAPIResponse.description = status.description;
        });

        return openAPIOperation;
    }

    protected static addRequestBodyToOperation(openAPIOperation: OpenAPIOperation, requestBody: any, requestParams: RequestParameterMetadata[]): void {
        openAPIOperation.requestBody = {
            description: requestBody.description,
            content: {},
        };

        const openAPIRequestBody: OpenAPIRequestBody = openAPIOperation.requestBody;

        requestParams.forEach(param => {
            if(param.mode === 'system' || param.mode === OpenAPIParameterInList.Query || param.mode === OpenAPIParameterInList.Path)
                return;

            if(!openAPIRequestBody.content[requestBody.contentType as ContentType])
                openAPIRequestBody.content[requestBody.contentType as ContentType] = {};

            const openAPIMediaType: OpenAPIMediaType = openAPIRequestBody.content[requestBody.contentType as ContentType] as OpenAPIMediaType;

            if(!openAPIMediaType.schema)
                openAPIMediaType.schema = {
                    type: 'object',
                };

            const openAPISchema: OpenAPISchema = openAPIMediaType.schema;

            if(!openAPISchema.properties)
                openAPISchema.properties = {};

            openAPISchema.properties[param.key] = {
                type: param.type as string,
            }

            if(param.exampleValue && !openAPISchema.example) {
                openAPISchema.example = {};
            }

            if(param.exampleValue)
                openAPISchema.example[param.key] = param.exampleValue;

            if(param.required && !openAPISchema.required)
                openAPISchema.required = [];

            if(param.required && openAPISchema.required)
                openAPISchema.required.push(param.key);
        });
    }

    protected static addPathParamsToOperation(openAPIOperation: OpenAPIOperation, requestParams: RequestParameterMetadata[]): void {
        requestParams.forEach(param => {
            if(param.mode !== OpenAPIParameterInList.Query && param.mode !== OpenAPIParameterInList.Path)
                return;

            const pathParam: OpenAPIParameter = {
                name: param.key,
                in: param.mode === 'path' ? OpenAPIParameterInList.Path : OpenAPIParameterInList.Query,
                description: param.summary,
                required: param.required || false,
                schema: {
                    type: param.type?.toLowerCase()
                }
            };
            
            if(!openAPIOperation.parameters)
                openAPIOperation.parameters = [pathParam];
            else
                openAPIOperation.parameters.push(pathParam);
        });
    }

    protected static parseOpenAPIJsonConfig(): void {
        if(!this.openAPIJsonPath && require.main) {
            const baseDir = dirname(require.main.filename);
            this.openAPIJsonPath = path.join(baseDir, 'OpenAPI.json');
        }

        if(!fs.existsSync(this.openAPIJsonPath))
            return;

        const fileContent = JSON.parse(fs.readFileSync(this.openAPIJsonPath, 'utf-8'));

        if(fileContent.info)
            this.openAPIData.info = fileContent.info;

        if(fileContent.servers)
            this.openAPIData.servers = fileContent.servers;

        if(fileContent.webhooks)
            this.openAPIData.webhooks = fileContent.webhooks;

        if(fileContent.components)
            this.openAPIData.components = fileContent.components;

        if(fileContent.security)
            this.openAPIData.security = fileContent.security;

        if(fileContent.tags)
            this.openAPIData.tags = fileContent.tags;

        if(fileContent.externalDocs)
            this.openAPIData.externalDocs = fileContent.externalDocs;
    }

    protected static addGlobalTag(tag: string, description: string): void {
        if(!this.openAPIData.tags)
            this.openAPIData.tags  = [];

        for(let i = 0, len = this.openAPIData.tags.length; i < len; ++i) {
            if(this.openAPIData.tags[i].name === tag)
                return;
        }

        this.openAPIData.tags.push({
            name: tag,
            description,
        });
    }

    public static handleRoute(controller: any, controllerInstance: any, methodName: string): void {
        const controllerPath: string = Reflect.getMetadata('etd:path', controller);
        const controllerTags: string = Reflect.getMetadata('etd:tags', controller);
        const controllerDescription: string = Reflect.getMetadata('etd:description', controller);
        const httpVerb: HttpVerb = Reflect.getMetadata('etd:verb', controllerInstance, methodName);
        const routePath: string = Reflect.getMetadata('etd:path', controllerInstance, methodName);
        const httpStatus: HttpStatus[] = Reflect.getMetadata('etd:httpStatus', controllerInstance, methodName) || [];
        const routeDescription: string = Reflect.getMetadata('etd:routeDescription', controllerInstance, methodName);
        const requestBody = Reflect.getMetadata('etd:requestBody', controllerInstance, methodName);
        const requestParams: RequestParameterMetadata[] = Reflect.getMetadata('etd:requestParams', controllerInstance, methodName) || [];

        const fullPath = path.posix.join(controllerPath || '', routePath);
        const openAPIPath: OpenAPIPathItem = this.getOpenAPIPath(fullPath);
        
        const openAPIOperation = this.addHttpVerbToPathItem(openAPIPath, httpVerb, httpStatus, routeDescription, controllerTags);

        if(requestBody)
            this.addRequestBodyToOperation(openAPIOperation, requestBody, requestParams);

        this.addPathParamsToOperation(openAPIOperation, requestParams);

        if(controllerTags && controllerDescription)
            this.addGlobalTag(controllerTags, controllerDescription);
    }

    public static getOpenAPIJson(): (req: Request, res: Response) => void {
        this.parseOpenAPIJsonConfig();

        return (req: Request, res: Response): void => {
            res.send(this.openAPIData);
        };
    }

    public static setOpenAPIInfo(info: OpenAPIInfo): void {
        this.openAPIData.info = info;
    }

    public static setOpenAPITags(tags: string[] | OpenAPITag[]): void {

        tags.forEach(tag => {
            if(!this.openAPIData.tags)
                this.openAPIData.tags = [];

            if(typeof tag === 'string')
                this.openAPIData.tags.push({
                    name: tag,
                });
            else
                this.openAPIData.tags.push(tag);
        });
    }

    public static setOpenAPIJsonPath(path: string): void {
        this.openAPIJsonPath = path;
    }

    public static reset(): void {
        this.openAPIData = {
            openapi: "3.0.1",
            info: {
                title: "General API",
                version: "1"
            }
        };
    }
}

export default OpenAPIService;