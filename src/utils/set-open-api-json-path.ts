import OpenAPIService from '../services/open-api';

/**
 * Set the filepath where to location OpenAPI.json
 * 
 * @param path filepath for json file with OpenAPI information
 */
function setOpenAPIJsonPath(path: string): void {
    OpenAPIService.setOpenAPIJsonPath(path);
}

export default setOpenAPIJsonPath;