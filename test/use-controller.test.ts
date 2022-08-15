import {Router, Request, Response} from 'express';
import {useController} from '../src';
import OpenAPIService from '../src/services/open-api';

jest.mock('express');
jest.mock('../src/services/open-api');

describe('useController Utility', () => {
    const getMetadataMock = jest.spyOn(Reflect, 'getMetadata');
    const getMock = jest.fn();
    const postMock = jest.fn();
    const putMock = jest.fn();
    const deleteMock = jest.fn();

    beforeEach(() => {
        (Router as jest.Mock).mockReturnValueOnce({
            get: getMock,
            post: postMock,
            put: putMock,
            delete: deleteMock,
        });
    });

    test('creates a router', () => {
        useController(jest.fn());
        expect(Router).toHaveBeenCalledTimes(1);
    });

    test('handles get requests', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');

        useController(ControllerMock);

        expect(getMock).toHaveBeenCalledWith('/api-path', [], expect.any(Function));
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).not.toHaveBeenCalled();

        const cb = getMock.mock.calls[0][2];
        await cb({}, {});

        expect(mockGetRequest).toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).toHaveBeenCalled();
    });

    test('handles post requests', async () => {
        class ControllerMock {
            async postRequest(req: Request, res: Response) {}
        }

        const mockPostRequest = jest.spyOn(ControllerMock.prototype, 'postRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('post');
        getMetadataMock.mockReturnValueOnce('/api-path');

        useController(ControllerMock);

        expect(getMock).not.toHaveBeenCalled();
        expect(postMock).toHaveBeenCalledWith('/api-path', [], expect.any(Function));
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).not.toHaveBeenCalled();

        const cb = postMock.mock.calls[0][2];
        await cb({}, {});

        expect(mockPostRequest).toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).toHaveBeenCalled();
    });
    
    test('handles put requests', async () => {
        class ControllerMock {
            async putRequest(req: Request, res: Response) {}
        }

        const mockPutRequest = jest.spyOn(ControllerMock.prototype, 'putRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('put');
        getMetadataMock.mockReturnValueOnce('/api-path');

        useController(ControllerMock);

        expect(getMock).not.toHaveBeenCalled();
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).toHaveBeenCalledWith('/api-path', [], expect.any(Function));
        expect(deleteMock).not.toHaveBeenCalled();

        const cb = putMock.mock.calls[0][2];
        await cb({}, {});

        expect(mockPutRequest).toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).toHaveBeenCalled();
    });
    
    test('handles delete requests', async () => {
        class ControllerMock {
            async deleteRequest(req: Request, res: Response) {}
        }

        const mockDeleteRequest = jest.spyOn(ControllerMock.prototype, 'deleteRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('delete');
        getMetadataMock.mockReturnValueOnce('/api-path');

        useController(ControllerMock);

        expect(getMock).not.toHaveBeenCalled();
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).toHaveBeenCalledWith('/api-path', [], expect.any(Function));

        const cb = deleteMock.mock.calls[0][2];
        await cb({}, {});

        expect(mockDeleteRequest).toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).toHaveBeenCalled();
    });

    test('does not create router methods when metadata is not set for class method', async () => {
        class ControllerMock {
            async deleteRequest(req: Request, res: Response) {}
        }
        useController(ControllerMock);

        expect(getMock).not.toHaveBeenCalled();
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).not.toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).not.toHaveBeenCalled();
    });

    test('should provide the express request object to the route', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');
        getMetadataMock.mockReturnValueOnce([]);
        getMetadataMock.mockReturnValueOnce([{key: 'request', mode: 'system'}]);
        const mockReq = jest.fn();
        const mockRes = jest.fn();

        useController(ControllerMock);

        const cb = getMock.mock.calls[0][2];
        await cb(mockReq, mockRes);

        expect(mockGetRequest).toHaveBeenCalledWith(mockReq);
    });

    test('should provide the express response object to the route', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');
        getMetadataMock.mockReturnValueOnce([]);
        getMetadataMock.mockReturnValueOnce([{key: 'response', mode: 'system'}]);
        const mockReq = jest.fn();
        const mockRes = jest.fn();

        useController(ControllerMock);

        const cb = getMock.mock.calls[0][2];
        await cb(mockReq, mockRes);

        expect(mockGetRequest).toHaveBeenCalledWith(mockRes);
    });

    test('should provide payload parameters to the route', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');
        getMetadataMock.mockReturnValueOnce([]);
        getMetadataMock.mockReturnValueOnce([
            {key: 'param1', mode: 'request'}, 
            {key: 'param2', mode: 'request'}
        ]);
        const mockReq = jest.fn();
        const mockRes = jest.fn();

        Object.defineProperty(mockReq, 'body', {
            value: {
                'param1': 'A',
                'param2': 'B',
                'param3': 'C',
            },
            writable: false,
        });

        useController(ControllerMock);

        const cb = getMock.mock.calls[0][2];
        await cb(mockReq, mockRes);

        expect(mockGetRequest).toHaveBeenCalledWith('A', 'B');
    });

    test('should join controller path and route path', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce('/api');
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');

        useController(ControllerMock);

        expect(getMock).toHaveBeenCalledWith('/api/api-path', [], expect.any(Function));
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).not.toHaveBeenCalled();

        const cb = getMock.mock.calls[0][2];
        await cb({}, {});

        expect(mockGetRequest).toHaveBeenCalled();
        expect(OpenAPIService.handleRoute).toHaveBeenCalled();
    });

    test('should provide query string parameters to the route', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path');
        getMetadataMock.mockReturnValueOnce([]);
        getMetadataMock.mockReturnValueOnce([
            {key: 'param1', mode: 'query'}, 
            {key: 'param2', mode: 'query'}
        ]);
        const mockReq = jest.fn();
        const mockRes = jest.fn();

        Object.defineProperty(mockReq, 'query', {
            value: {
                'param1': 'A',
                'param2': 'B',
                'param3': 'C',
            },
            writable: false,
        });

        useController(ControllerMock);

        const cb = getMock.mock.calls[0][2];
        await cb(mockReq, mockRes);

        expect(mockGetRequest).toHaveBeenCalledWith('A', 'B');
    });

    test('should provide url parameters to the route', async () => {
        class ControllerMock {
            async getRequest(req: Request, res: Response) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce('get');
        getMetadataMock.mockReturnValueOnce('/api-path/:id');
        getMetadataMock.mockReturnValueOnce([]);
        getMetadataMock.mockReturnValueOnce([
            {key: 'id', mode: 'path'}, 
        ]);
        const mockReq = jest.fn();
        const mockRes = jest.fn();

        Object.defineProperty(mockReq, 'params', {
            value: {
                'id': 'A',
                'param2': 'B',
                'param3': 'C',
            },
            writable: false,
        });

        useController(ControllerMock);

        const cb = getMock.mock.calls[0][2];
        await cb(mockReq, mockRes);

        expect(mockGetRequest).toHaveBeenCalledWith('A');
    });
});