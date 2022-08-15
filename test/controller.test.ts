import {Controller} from '../src';

describe('Controller Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };

        const cb = Controller('/api', 'test', 'test controller');
        cb(obj);

        expect(defineMetadataMock).toHaveBeenCalledTimes(3);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:path', '/api', obj)
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:tags', 'test', obj)
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:description', 'test controller', obj)
    });
});