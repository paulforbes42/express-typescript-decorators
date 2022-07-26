import 'reflect-metadata';

import Controller from './decorators/controller';
import HttpGet from './decorators/http-get';
import HttpPost from './decorators/http-post';
import HttpPut from './decorators/http-put';
import HttpDelete from './decorators/http-delete';
import Middleware from './decorators/middleware';

import useController from './utils/use-controller';

export {
    Controller,
    HttpGet,
    HttpPost,
    HttpPut,
    HttpDelete,
    Middleware,

    useController,
}