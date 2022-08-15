import OpenAPIService from '../services/open-api';
import {OpenAPITag} from '../types/open-api-3-1-0';

function setOpenAPITags(tags: string[] | OpenAPITag[]): void {
    OpenAPIService.setOpenAPITags(tags);
}

export default setOpenAPITags;