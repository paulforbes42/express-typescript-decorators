export type RequestParameterMetadata = {
    key: string
    mode: string
    type?: string
    summary?: string
    exampleValue?: string | number | boolean | undefined
    required?: boolean
    deprecated?: boolean
};

export default RequestParameterMetadata;