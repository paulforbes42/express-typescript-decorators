describe('HttpDelete Decorator', () => {
    const {HttpDelete} = require('../dist/index');
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
        const cb = HttpDelete('/api-path');
        cb(obj, 'fn');

        expect(defineMetadataMock).toHaveBeenCalledTimes(2);
        expect(defineMetadataMock).toHaveBeenCalledWith('httpVerb', 'delete', obj, 'fn');
        expect(defineMetadataMock).toHaveBeenCalledWith('path', '/api-path', obj, 'fn');
    });
});