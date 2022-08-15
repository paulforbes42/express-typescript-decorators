import OpenAPIService from '../src/services/open-api';
import {setOpenAPIInfo} from '../src';
import {OpenAPIInfo} from '../src/types/open-api-3-1-0';

jest.mock('../src/services/open-api');

describe('Set Open API Info Utility Method', () => {
    test('should capture OpenAPI Info', () => {
        const openAPIInfo: OpenAPIInfo = {
            title: 'Test API',
            version: '0.0.1'
        };

        setOpenAPIInfo(openAPIInfo);

        expect(OpenAPIService.setOpenAPIInfo).toHaveBeenCalledTimes(1);
        expect(OpenAPIService.setOpenAPIInfo).toHaveBeenCalledWith(openAPIInfo);
    })
});