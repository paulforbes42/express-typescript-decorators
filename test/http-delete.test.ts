import {HttpDelete} from '../src';

describe('HttpDelete Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpDelete('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'delete', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
    });

    test('should optionally capture a route description', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpDelete('/api-path', 'A delete route');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(3);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:verb', 'delete', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api-path', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:routeDescription', 'A delete route', obj, 'fn');
    });
});