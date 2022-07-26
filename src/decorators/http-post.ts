function HttpPost<T>(path: string): (target: T, propertyKey: string) => void {
    return function (target: T, propertyKey: string): void {
        Reflect.defineMetadata('httpVerb', 'post', target, propertyKey);
        Reflect.defineMetadata('path', path, target, propertyKey);
    }
}

export default HttpPost;