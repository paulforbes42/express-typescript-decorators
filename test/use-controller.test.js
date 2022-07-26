jest.mock('express', () => ({
    __esModule: true,
    default: 'express',
    Router: jest.fn(),
}));

const {Router} = require('express');

describe('useController Utility', () => {
    const {default: Default} = require('../dist/index');
    const {useController} = require('../dist/index');
    const getMetadataMock = jest.spyOn(Reflect, 'getMetadata');
    const getMock = jest.fn();
    const postMock = jest.fn();
    const putMock = jest.fn();
    const deleteMock = jest.fn();

    beforeEach(() => {
        Router.mockReturnValueOnce({
            get: getMock,
            post: postMock,
            put: putMock,
            delete: deleteMock,
        });
    });

    afterEach(() => {
        getMetadataMock.mockClear();
        Router.mockClear();
        getMock.mockClear();
        postMock.mockClear();
        putMock.mockClear();
        deleteMock.mockClear();
    });

    afterAll(() => {
        getMetadataMock.mockRestore();
        Router.mockRestore();
    });

    test('creates a router', () => {
        useController(jest.fn());
        expect(Router).toHaveBeenCalledTimes(1);
    });

    test('handles get requests', async () => {
        class ControllerMock {
            async getRequest(req, res) {}
        }

        const mockGetRequest = jest.spyOn(ControllerMock.prototype, 'getRequest');
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
    });

    test('handles post requests', async () => {
        class ControllerMock {
            async postRequest(req, res) {}
        }

        const mockPostRequest = jest.spyOn(ControllerMock.prototype, 'postRequest');
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
    });
    
    test('handles put requests', async () => {
        class ControllerMock {
            async putRequest(req, res) {}
        }

        const mockPutRequest = jest.spyOn(ControllerMock.prototype, 'putRequest');
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
    });
    
    test('handles delete requests', async () => {
        class ControllerMock {
            async deleteRequest(req, res) {}
        }

        const mockDeleteRequest = jest.spyOn(ControllerMock.prototype, 'deleteRequest');
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
    });

    test('does not create router methods when metadata is not set for class method', async () => {
        class ControllerMock {
            async deleteRequest(req, res) {}
        }
        useController(ControllerMock);

        expect(getMock).not.toHaveBeenCalled();
        expect(postMock).not.toHaveBeenCalled();
        expect(putMock).not.toHaveBeenCalled();
        expect(deleteMock).not.toHaveBeenCalled();
    });
});