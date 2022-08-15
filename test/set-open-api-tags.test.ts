import OpenAPIService from '../src/services/open-api';
import {setOpenAPITags} from '../src';
import {OpenAPITag} from '../src/types/open-api-3-1-0';

jest.mock('../src/services/open-api');

describe('Set Open API Tags Utility Method', () => {
    test('should capture OpenAPI tags as an array of strings', () => {
        const tags = ["One", "Two"];

        setOpenAPITags(tags);

        expect(OpenAPIService.setOpenAPITags).toHaveBeenCalledTimes(1);
        expect(OpenAPIService.setOpenAPITags).toHaveBeenCalledWith(tags);
    });

    test('should capture OpenAPI tags as an array of OpenAPITag objects', () => {
        const tags: OpenAPITag[] = [{
            name: "One",
            description: "First"
        }, {
            name: "Two",
            description: "Second"
        }];

        setOpenAPITags(tags);

        expect(OpenAPIService.setOpenAPITags).toHaveBeenCalledTimes(1);
        expect(OpenAPIService.setOpenAPITags).toHaveBeenCalledWith(tags);
    });
});