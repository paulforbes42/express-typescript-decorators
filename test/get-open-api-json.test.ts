import OpenAPIService from '../src/services/open-api';
import {getOpenAPIJson} from '../src';

jest.mock('../src/services/open-api');

describe('Set Open API Info Utility Method', () => {
    test('should capture OpenAPI Info', () => {
        const mockGetOpenAPIJson = jest.spyOn(OpenAPIService, 'getOpenAPIJson');
        const mockRoute = jest.fn();

        mockGetOpenAPIJson.mockReturnValueOnce(mockRoute);

        const rv = getOpenAPIJson();

        expect(mockGetOpenAPIJson).toHaveBeenCalledTimes(1);
        expect(rv).toBe(mockRoute);
    })
});