import {HttpPost} from '../src';

describe('HttpPost Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpPost('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'post', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
    });

    test('should optionally capture a route description', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpPost('/api-path', 'POST method');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(3);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'post', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:routeDescription', 'POST method', obj, 'fn');
    });

});