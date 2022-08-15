import ContentType from './content-type';

// http://spec.openapis.org/oas/v3.1.0
export type OpenAPI = {
    openapi: string
    info: OpenAPIInfo
    jsonSchemaDialect?: string
    servers?: OpenAPIServers[]
    paths?: OpenAPIPath
    webhooks?: {
        [key: string]: OpenAPIPathItem | OpenAPIReference
    }
    components?: OpenAPIComponents
    security?: OpenAPISecurityRequirement
    externalDocs?: OpenAPIExternalDocumentation
    tags?: OpenAPITag[]
};

export type OpenAPIInfo = {
    title: string
    summary?: string
    description?: string
    termsOfService?: string
    contact?: OpenAPIContact
    license?: OpenAPILicense
    version: string
};

export type OpenAPIContact = {
    name?: string
    url?: string
    email?: string
};

export type OpenAPILicense = {
    name: string
    identifier?: string
    url?: string
};

export type OpenAPIServers = {
    url: string
    description?: string
    variables?: OpenAPIServersVariables
};

export type OpenAPIServersVariables = {
    enum?: string[]
    default: string
    description?: string
};

export type OpenAPIPath = {
    [key: string]: OpenAPIPathItem
};

export type OpenAPIPathItem = {
    '$ref'?: string
    summary?: string
    description?: string
    get?: OpenAPIOperation
    put?: OpenAPIOperation
    post?: OpenAPIOperation
    delete?: OpenAPIOperation
    options?: OpenAPIOperation
    head?: OpenAPIOperation
    patch?: OpenAPIOperation
    trace?: OpenAPIOperation
    servers?: OpenAPIServers[]
    parameters?: OpenAPIParameter | OpenAPIReference
};

export type OpenAPIOperation = {
    tags?: string[]
    summary?: string
    description?: string
    externalDocs?: OpenAPIExternalDocumentation
    operationId?: string
    parameters?: [OpenAPIParameter | OpenAPIReference]
    requestBody?: OpenAPIRequestBody | OpenAPIReference
    responses?: OpenAPIResponses
    callbacks?: OpenAPICallback | OpenAPIReference
    deprecated?: boolean
    security?: OpenAPISecurityScheme
    servers?: OpenAPIServers[]
};

export type OpenAPIExternalDocumentation = {
    description?: string
    url: string
};

export enum OpenAPIParameterInList {
    Query = 'query',
    Header = 'header',
    Path = 'path',
    Cookie = 'cookie',
}

export type OpenAPIParameter = {
    name: string
    in: OpenAPIParameterInList
    description?: string
    required: boolean
    deprecated?: boolean
    allowEmptyValue?: boolean
    style?: string
    explode?: boolean
    allowReserved?: boolean
    schema?: OpenAPISchema
    example?: any
    examples?: OpenAPIExample | OpenAPIReference
    content?: OpenAPIMediaType
};

export type OpenAPIRequestBody = {
    description?: string
    content: {
        [key in ContentType]?: OpenAPIMediaType
    }
    required?: boolean
};

export type OpenAPIMediaType = {
    schema?: OpenAPISchema
    example?: any
    examples?: OpenAPIExample | OpenAPIReference
    encoding?: OpenAPIEncoding
};

export type OpenAPIEncoding = {
    contentType?: string
    headers?: OpenAPIHeader | OpenAPIReference
    style?: string
    explode?: boolean
    allowReserved?: boolean
};

export type OpenAPIResponses = {
    [key: string]: OpenAPIResponse | OpenAPIReference
};

export type OpenAPIResponse = {
    description: string
    headers?: OpenAPIHeader | OpenAPIReference
    content?: OpenAPIMediaType
    links?: OpenAPILink | OpenAPIReference
};

// TODO
export type OpenAPICallback = {
    [key: string]: any
};

export type OpenAPIExample = {
    summary?: string
    description?: string
    value?: any
    externalValue?: string
};

export type OpenAPILink = {
    operationRef?: string
    operationId?: string
    parameters?: any
    requestBody?: any
    description?: string
    server?: OpenAPIServers
};

export type OpenAPITag = {
    name: string
    description?: string
    externalDocs?: OpenAPIExternalDocumentation
};

export type OpenAPIHeader = {
    name: string
    in: string
    description?: string
    required: boolean
    deprecated?: boolean
    allowEmptyValue?: boolean
    style?: string
    explode?: boolean
    allowReserved?: boolean
    schema?: OpenAPISchema
    example?: any
    examples?: OpenAPIExample | OpenAPIReference
    content?: OpenAPIMediaType
};

export type OpenAPIReference = {
    '$ref': string
    summary?: string
    description?: string
};

export type OpenAPISchema = {
    discriminator?: OpenAPIDiscriminator
    xml?: OpenAPIXml
    externalDocs?: OpenAPIExternalDocumentation
    example?: any
    type?: string
    required?: string[]
    properties?: {
        [key: string]: OpenAPISchemaProperty
    }

};

type OpenAPISchemaProperty = {
    type: string
    format?: string
    minimum?: number
    maximum?: number
};

export type OpenAPIDiscriminator = {
    propertyName: string
    mapping?: any
};

export type OpenAPIXml = {
    name?: string
    namespace?: string
    prefix?: string
    attribute?: boolean
    wrapped?: boolean
};

export type OpenAPISecurityScheme = {
    type: string
    description?: string
    name: string
    in: string
    scheme: string
    bearerFormat?: string
    flows: OpenAPIOauthFlows
    openIdConnectUrl: string
};

export type OpenAPIOauthFlows = {
    implicit?: OpenAPIOauthFlow
    password?: OpenAPIOauthFlow
    clientCredentials?: OpenAPIOauthFlow
    authorizationCode?: OpenAPIOauthFlow
};

export type OpenAPIOauthFlow = {
    authorizationUrl: string
    tokenUrl: string
    refreshUrl?: string
    scopes?: {
        [key: string]: string
    }
};

export type OpenAPIComponents = {
    schemas?: {
        [key: string]: OpenAPISchema
    }
    responses?: {
        [key: string]: OpenAPIResponse | OpenAPIReference
    }
    parameters?: {
        [key: string]: OpenAPIParameter | OpenAPIReference
    }
    examples?: {
        [key: string]: OpenAPIExample | OpenAPIReference
    }
    requestBodies?: {
        [key: string]: OpenAPIRequestBody | OpenAPIReference
    }
    headers?: {
        [key: string]: OpenAPIHeader | OpenAPIReference
    }
    securitySchemes?: {
        [key: string]: OpenAPISecurityScheme | OpenAPIReference
    }
    links?: {
        [key: string]: OpenAPILink | OpenAPIReference
    }
    callbacks?: {
        [key: string]: OpenAPILink | OpenAPIReference
    }
    pathItems?: {
        [key: string]: OpenAPIPath | OpenAPIReference
    }
};

export type OpenAPISecurityRequirement = {
    [key: string]: string[]
};