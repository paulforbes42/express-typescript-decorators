import {UrlParam} from '../src';
import RequestParameterMetadata from '../src/types/request-parameter-metadata';

describe('UrlParam Decorator', () => {
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');
    const getMetadataMock = jest.spyOn(Reflect, 'getMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        getMetadataMock.mockReturnValueOnce(undefined);
        getMetadataMock.mockReturnValueOnce([{name: 'String'}])
        const mockData: RequestParameterMetadata[] = [{
            key: 'a',
            summary: 'Input A',
            exampleValue: 'A',
            type: 'String',
            required: true,
            mode: 'path',
        }];
        const cb = UrlParam('a', 'Input A', 'A');
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
            mode: 'path',
        }]);
        getMetadataMock.mockReturnValueOnce([{name: 'String'}, {name: 'Number'}]);
        const mockData: RequestParameterMetadata[] = [{
            key: 'a',
            summary: 'Input A',
            exampleValue: 'A',
            type: 'String',
            required: true,
            mode: 'path',
        }, {
            key: 'n',
            summary: 'Input N',
            exampleValue: 5,
            type: 'Number',
            required: true,
            mode: 'path',
        }];
        const cb = UrlParam('n', 'Input N', 5);
        cb(obj, 'fn', 1);

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:requestParams', mockData, obj, 'fn');
    });
});