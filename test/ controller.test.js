describe('Controller Decorator', () => {
    const {Controller} = require('../dist/index');
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    afterEach(() => {
        defineMetadataMock.mockClear();
    });

    afterAll(() => {
        defineMetadataMock.mockRestore();
    });

    test('should capture metadata', () => {
        Controller();
    });
});