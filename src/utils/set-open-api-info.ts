import {OpenAPIInfo} from '../types/open-api-3-1-0';
import OpenAPIService from '../services/open-api';

function setOpenAPIInfo(info: OpenAPIInfo): void {
    OpenAPIService.setOpenAPIInfo(info);
}

export default setOpenAPIInfo;