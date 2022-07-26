describe('Middleware Decorator', () => {
    const {Middleware} = require('../dist/index');
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    afterEach(() => {
        defineMetadataMock.mockClear();
    });

    afterAll(() => {
        defineMetadataMock.mockRestore();
    });

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const mockMiddleware = jest.fn();
        const mw = [mockMiddleware];
        const cb = Middleware(mw);
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('middleware', mw, obj, 'fn');
    });
});