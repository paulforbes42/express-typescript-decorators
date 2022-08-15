import {HttpPut} from '../src';

describe('HttpPut Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpPut('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'put', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
    });

    test('should optionally capture a route description', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpPut('/api-path', 'give a put');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(3);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'put', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:routeDescription', 'give a put', obj, 'fn');
    });

});