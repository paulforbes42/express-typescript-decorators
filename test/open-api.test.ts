import 'reflect-metadata';
import fs from 'fs';
import OpenAPIService from '../src/services/open-api';
import {
    OpenAPIInfo,
    OpenAPIOperation,
    OpenAPIParameter,
    OpenAPIParameterInList,
    OpenAPIRequestBody,
    OpenAPIResponse,
    OpenAPITag,
} from '../src/types/open-api-3-1-0';
import RequestParameterMetadata from '../src/types/request-parameter-metadata';
import HttpStatus from '../src/types/http-status';

jest.mock('fs');

describe('OpenAPI Documentation Service', () => {
    const mockGetMetadata = jest.spyOn(Reflect, 'getMetadata');

    afterEach(() => {
        OpenAPIService.reset();
    });

    test('should have required OpenAPI data by default', () => {
        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledTimes(1);

        const responseBody = mockRes.send.mock.calls[0][0];

        expect(responseBody.openapi).toBe('3.0.1');
        expect(responseBody.info.version).toBe('1');
    });

    test('should set OpenAPI Info', () => {
        const mockInfo: OpenAPIInfo = {
            title: 'sample',
            version: '1'
        };

        OpenAPIService.setOpenAPIInfo(mockInfo);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledTimes(1);

        const responseBody = mockRes.send.mock.calls[0][0];

        expect(responseBody.openapi).toBe('3.0.1');
        expect(responseBody.info).toBe(mockInfo);
    });

    test('should parse the OpenAPI.json config file for info', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"info":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.info).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for servers', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"servers":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.servers).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for webhooks', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"webhooks":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.webhooks).toStrictEqual({"test":1});
    });
    
    test('should parse the OpenAPI.json config file for components', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"components":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.components).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for security', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"security":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.security).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for tags', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"tags":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.tags).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for externalDocs', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"externalDocs":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.externalDocs).toStrictEqual({"test":1});
    });

    test('should parse the OpenAPI.json config file for all mapped fields', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonData = {
            info: {test:1},
            servers: {test:2},
            webhooks: {test:3},
            components: {test:4},
            security: {test:5},
            tags: {test:6},
            externalDocs: {test:7}
        };
        const jsonString = JSON.stringify(jsonData);

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.info).toStrictEqual({"test":1});
        expect(responseBody.servers).toStrictEqual({"test":2});
        expect(responseBody.webhooks).toStrictEqual({"test":3});
        expect(responseBody.components).toStrictEqual({"test":4});
        expect(responseBody.security).toStrictEqual({"test":5});
        expect(responseBody.tags).toStrictEqual({"test":6});
        expect(responseBody.externalDocs).toStrictEqual({"test":7});
    });

    test('should set the OpenAPI.json config file path', () => {
        const mockExistsSync = jest.spyOn(fs, 'existsSync');
        const mockReadFileSync = jest.spyOn(fs,'readFileSync');
        const jsonString = '{"externalDocs":{"test":1}}';

        mockExistsSync.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValue(jsonString);
        OpenAPIService.setOpenAPIJsonPath('new/location/OpenAPI.json');
        OpenAPIService.getOpenAPIJson();

        expect(mockReadFileSync).toHaveBeenCalledWith('new/location/OpenAPI.json', 'utf-8');
    });

    test('should set tags from strings', () => {
        const tags = ['one', 'two'];

        OpenAPIService.setOpenAPITags(tags);
        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.tags).toStrictEqual([
            {name: 'one'},
            {name: 'two'},
        ]);
    });

    test('should set tags from OpenAPITag objects', () => {
        const tags: OpenAPITag[] = [
            {name: 'one', description: 'First'},
            {name: 'two', description: 'Second'},
        ];

        OpenAPIService.setOpenAPITags(tags);
        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.tags).toStrictEqual([
            {name: 'one', description: 'First'},
            {name: 'two', description: 'Second'},
        ]);
    });

    test('should create an OpenAPIPath', () => {
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce('route description'); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.paths['/api-path'].get.description).toBe('route description');
    });

    test('should add http responses to an OpenAPIPath', () => {
        const httpStatus: HttpStatus[] = [
            {statusCode: 200, description: 'Success', contentType: 'application/json', example: 'test'},
            {statusCode: 401, description: 'Forbidden'},
        ];

        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(httpStatus); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        const getOperation: OpenAPIOperation = responseBody.paths['/api-path'].get;

        expect(getOperation.responses).toBeTruthy();

        if(!getOperation.responses)
            return;

        const openAPIResponse: OpenAPIResponse = getOperation.responses['200'] as OpenAPIResponse;

        expect(openAPIResponse).toBeTruthy();

        if(!openAPIResponse)
            return;

        expect(openAPIResponse.content).toBeTruthy();

        if(!openAPIResponse.content)
            return;

        expect(getOperation.responses['200'].description).toBe('Success');
        expect(openAPIResponse.content['application/json']).toBeTruthy();
        expect(openAPIResponse.content['application/json'].schema).toBeTruthy();

        if(!openAPIResponse.content['application/json'].schema)
            return;

        expect(openAPIResponse.content['application/json'].schema.type).toBe('string');
        expect(openAPIResponse.content['application/json'].example).toBe('test');
        expect(getOperation.responses['401']).toStrictEqual({description: 'Forbidden'});
    });

    test('should handle http responses with example arrays', () => {
        const httpStatus: HttpStatus[] = [
            {statusCode: 200, description: 'Success', contentType: 'application/json', example: ['test']},
            {statusCode: 401, description: 'Forbidden'},
        ];

        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(httpStatus); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        const getOperation: OpenAPIOperation = responseBody.paths['/api-path'].get;

        expect(getOperation.responses).toBeTruthy();

        if(!getOperation.responses)
            return;

        const openAPIResponse: OpenAPIResponse = getOperation.responses['200'] as OpenAPIResponse;

        expect(openAPIResponse).toBeTruthy();

        if(!openAPIResponse)
            return;

        expect(openAPIResponse.content).toBeTruthy();

        if(!openAPIResponse.content)
            return;

        expect(getOperation.responses['200'].description).toBe('Success');
        expect(openAPIResponse.content['application/json']).toBeTruthy();
        expect(openAPIResponse.content['application/json'].schema).toBeTruthy();

        if(!openAPIResponse.content['application/json'].schema)
            return;

        expect(openAPIResponse.content['application/json'].schema.type).toBe('array');
        expect(openAPIResponse.content['application/json'].example).toStrictEqual(['test']);
        expect(getOperation.responses['401']).toStrictEqual({description: 'Forbidden'});
    });

    test('should add a request body to an OpenAPIPath', () => {
        const requestBody = {
            contentType: 'application/json',
            description: 'Send a payload to create a record',
        };
        const requestParams: RequestParameterMetadata[] = [
            {
                mode: 'system',
                key: 'request',
            },
            {
                mode: 'request',
                key: 'inputA',
                exampleValue: 'A',
                type: 'string',
                required: true,
                summary: 'First Input',
            },
            {
                mode: OpenAPIParameterInList.Query,
                key: 'test'
            },
            {
                mode: OpenAPIParameterInList.Path,
                key: 'inputB',
                exampleValue: 'B',
                type: 'string',
                required: false,
                summary: 'Second Input',
            },
            {
                mode: 'request',
                key: 'inputC',
                exampleValue: 'C',
                type: 'string',
                required: false,
                summary: 'Third Input',
            },
        ];
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(requestBody); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(requestParams); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];

        const getOperation: OpenAPIOperation = responseBody.paths['/api-path'].get;
        const requestStruct: OpenAPIRequestBody = getOperation.requestBody as OpenAPIRequestBody;

        expect(requestStruct.description).toBe('Send a payload to create a record');
        expect(requestStruct.content['application/json']).toBeTruthy();
        expect(requestStruct.content['application/json']?.schema?.type).toBe('object');
        expect(requestStruct.content['application/json']?.schema?.example.inputA).toBe('A');
        expect(requestStruct.content['application/json']?.schema?.example.inputB).toBeFalsy();
        expect(requestStruct.content['application/json']?.schema?.example.inputC).toBe('C');

        expect(requestStruct.content['application/json']?.schema?.properties?.inputA.type).toBe('string');
        expect(requestStruct.content['application/json']?.schema?.properties?.inputB).toBeFalsy();
        expect(requestStruct.content['application/json']?.schema?.properties?.inputC.type).toBe('string');

        expect(requestStruct.content['application/json']?.schema?.required?.length).toBe(1);
        expect(requestStruct.content['application/json']?.schema?.required).toStrictEqual(['inputA']);
    });
    
    test('should add a request body to an OpenAPIPath 2', () => {
        const requestParams: RequestParameterMetadata[] = [
            {
                mode: 'system',
                key: 'request',
            },
            {
                mode: 'request',
                key: 'inputA',
                exampleValue: 'A',
                type: 'string',
                required: true,
                summary: 'First Input',
            },
            {
                mode: OpenAPIParameterInList.Query,
                key: 'test',
                exampleValue: 'A',
                type: 'string',
                required: true,
                summary: 'First Query',
            },
            {
                mode: OpenAPIParameterInList.Query,
                key: 'inputB',
                exampleValue: 'B',
                type: 'string',
                required: false,
                summary: 'Second Input',
            }
        ];
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(requestParams); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];

        const getOperation: OpenAPIOperation = responseBody.paths['/api-path'].get;
        expect(getOperation.parameters).toBeTruthy();

        if(!getOperation.parameters)
            return;

        expect(getOperation.parameters.length).toBe(2);

        const parameters = getOperation.parameters as OpenAPIParameter[];

        expect(parameters[0].name).toBe('test');
        expect(parameters[0].in).toBe('query');
        expect(parameters[0].description).toBe('First Query');
        expect(parameters[0].required).toBe(true);

        expect(parameters[1].name).toBe('inputB');
        expect(parameters[1].in).toBe('query');
        expect(parameters[1].description).toBe('Second Input');
        expect(parameters[1].required).toBe(false);
    });

    test('should create tags for the OpenAPIInfo', () => {
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce('test'); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce('test description'); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce('test'); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce('test description'); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('post'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method

        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        expect(responseBody.tags.length).toBe(1);
        expect(responseBody.tags[0]).toStrictEqual({
            name: 'test',
            description: 'test description'
        });
    });

    test('should capture security for a route', () => {
        const security = [{"bearerAuth":[]}];
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:path -> controller       
        mockGetMetadata.mockReturnValueOnce('test'); // etd:tags -> controller       
        mockGetMetadata.mockReturnValueOnce('test description'); // etd:description -> controller       
        mockGetMetadata.mockReturnValueOnce('get'); // etd:verb -> method
        mockGetMetadata.mockReturnValueOnce('/api-path'); // etd:path -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:httpStatus -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:routeDescription -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestBody -> method
        mockGetMetadata.mockReturnValueOnce(undefined); // etd:requestParams -> method
        mockGetMetadata.mockReturnValueOnce(security) // etd:security -> method

        var obj = {
            fn: jest.fn()
        };
        OpenAPIService.handleRoute(obj, obj, 'fn');

        const route = OpenAPIService.getOpenAPIJson();
        const mockReq: any = {};
        const mockRes: any = {
            send: jest.fn()
        };

        route(mockReq, mockRes);
        const responseBody = mockRes.send.mock.calls[0][0];
        const operation = responseBody.paths['/api-path'].get;
        expect(operation.security).toBeTruthy();
        expect(operation.security).toStrictEqual(security);
    });

});