import {Middleware} from '../src';

describe('Middleware Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const mockMiddleware = jest.fn()
        const mw = [mockMiddleware];

        const cb = Middleware(mw);
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:middleware', mw, obj, 'fn');
    });

    test('should capture security requirements', () => {
        const obj = {
            fn: jest.fn()
        };
        const mockMiddleware = jest.fn()
        const mw = [mockMiddleware];

        const cb = Middleware(mw, [{"bearerAuth": []}]);
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:middleware', mw, obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:security', [{"bearerAuth":[]}], obj, 'fn');
    })
});