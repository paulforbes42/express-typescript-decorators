import {OpenAPIInfo} from '../types/open-api-3-1-0';
import OpenAPIService from '../services/open-api';

/**
 * Set the info object for OpenAPI documentation.  Recommended to use OpenAPI.json instead.
 * 
 * @param info 
 */
function setOpenAPIInfo(info: OpenAPIInfo): void {
    OpenAPIService.setOpenAPIInfo(info);
}

export default setOpenAPIInfo;