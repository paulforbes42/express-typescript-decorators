import OpenAPIService from '../services/open-api';

function setOpenAPIJsonPath(path: string): void {
    OpenAPIService.setOpenAPIJsonPath(path);
}

export default setOpenAPIJsonPath;