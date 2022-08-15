import OpenAPIService from '../src/services/open-api';
import {setOpenAPIJsonPath} from '../src';

jest.mock('../src/services/open-api');

describe('Set Open API Json Path Utility Method', () => {
    test('should capture the path to the OpenAPI Json file', () => {

        setOpenAPIJsonPath('a/b/c');

        expect(OpenAPIService.setOpenAPIJsonPath).toHaveBeenCalledTimes(1);
        expect(OpenAPIService.setOpenAPIJsonPath).toHaveBeenCalledWith('a/b/c');
    });
});