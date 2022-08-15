import {Request, Response} from 'express';
import OpenAPIService from '../services/open-api';

/**
 * Return an Express route which will render the OpenAPI documentation for the API in JSON format.
 * @returns Get API method
 * @example
 * ```
 * app.use('/api-docs', getOpenAPIJson());
 * ```
 */
function getOpenAPIJson(): (req: Request, res: Response) => void {
    return OpenAPIService.getOpenAPIJson();
}

export default getOpenAPIJson;