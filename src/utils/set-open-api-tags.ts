import OpenAPIService from '../services/open-api';
import {OpenAPITag} from '../types/open-api-3-1-0';

/**
 * Specify tags to be included in the OpenAPI documentation.  Recommended to use OpenAPI.json instead.
 * 
 * @param tags 
 */
function setOpenAPITags(tags: string[] | OpenAPITag[]): void {
    OpenAPIService.setOpenAPITags(tags);
}

export default setOpenAPITags;