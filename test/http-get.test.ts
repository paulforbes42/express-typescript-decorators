import {HttpGet} from '../src';

describe('HttpGet Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpGet('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'get', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
    });

    test('should optionally capture a route description', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpGet('/api-path', 'Test HTTP Route');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(3);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'get', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:routeDescription', 'Test HTTP Route', obj, 'fn');
    });
});