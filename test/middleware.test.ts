import {Middleware} from '../src';

describe('Middleware Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const mockMiddleware = jest.fn();
        const mw = [mockMiddleware];

        // @ts-ignore
        const cb = Middleware(mw);
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:middleware', mw, obj, 'fn');
    });
});