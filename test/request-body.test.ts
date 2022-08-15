import {RequestBody} from '../src';

describe('RequestBody Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = RequestBody('application/json', 'Create a new object', true);
        cb(obj, 'fn');
        const mockData = {
            contentType: 'application/json',
            description: 'Create a new object',
            required: true,
        };

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:requestBody', mockData, obj, 'fn');
    });
});