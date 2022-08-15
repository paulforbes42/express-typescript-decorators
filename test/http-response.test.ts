import {HttpResponse} from '../src';
import HttpStatus from '../src/types/http-status';

describe('HttpResponse Decorator', () => {
    const getMetadataMock = jest.spyOn(Reflect, 'getMetadata');
    const defineMetadataMock = jest.spyOn(Reflect, 'defineMetadata');

    test('should capture metadata', () => {
        const obj = {
            fn: jest.fn()
        };
        const cb = HttpResponse(200, 'Success');
        cb(obj, 'fn');
        const mockData: HttpStatus[] = [{
            statusCode: 200,
            description: 'Success'
        }];

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:httpStatus', mockData, obj, 'fn');
    });

    test('should keep track of all http statuses', () => {
        const obj = {
            fn: jest.fn()
        };
        const mockData: HttpStatus[] = [{
            statusCode: 401,
            description: 'Unauthorized'
        }]
        getMetadataMock.mockReturnValueOnce(mockData);
        const cb = HttpResponse(201, 'Created');
        cb(obj, 'fn');
        const mockData2: HttpStatus[] = [{
            statusCode: 401,
            description: 'Unauthorized'
        }, {
            statusCode: 201,
            description: 'Created'
        }];

        expect(defineMetadataMock).toHaveBeenCalledTimes(1);
        expect(defineMetadataMock).toHaveBeenCalledWith('etd:httpStatus', mockData2, obj, 'fn');
    });

});