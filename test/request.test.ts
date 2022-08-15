import {Request} from '../src';
import RequestParameterMetadata from '../src/types/request-parameter-metadata';

describe('RequestParam Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');
    const getMetadataMock = jest.spyOn(Reflect, 'getMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        getMetadataMock.mockReturnValueOnce(undefined);
        const mockData: RequestParameterMetadata[] = [{
            key: 'request',
            mode: 'system',
        }];
        const cb = Request();
        cb(obj, 'fn', 0);

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:requestParams', mockData, obj, 'fn');
    });

    test('should record multiple parameters metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        getMetadataMock.mockReturnValueOnce([{
            key: 'a',
            summary: 'Input A',
            exampleValue: 'A',
            type: 'String',
            required: true,
            mode: 'request',
        }]);
        const mockData: RequestParameterMetadata[] = [{
            key: 'a',
            summary: 'Input A',
            exampleValue: 'A',
            type: 'String',
            required: true,
            mode: 'request',
        }, {
            key: 'request',
            mode: 'system',
        }];
        const cb = Request();
        cb(obj, 'fn', 1);

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:requestParams', mockData, obj, 'fn');
    });
});