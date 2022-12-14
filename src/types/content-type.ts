/**
 * Content types consumed and returned by HTTP routes
 * @enum
 */
export enum ContentType {
    ApplicationJson = 'application/json',
    ApplicationOctetStream = 'application/octet-stream',
    ApplicationXml = 'application/xml',
    MultipartFormData = 'multipart-form-data',
    TextPlain = 'text/plain',
    All = '*/*'
}

export default ContentType;