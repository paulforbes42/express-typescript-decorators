describe('HttpGet Decorator', () => {
    const {HttpGet} = require('../dist/index');
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
        const cb = HttpGet('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('httpVerb', 'get', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('path', '/api-path', obj, 'fn');
    });
});