import 'reflect-metadata';
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';

import Controller from './decorators/controller';
import HttpGet from './decorators/http-get';
import HttpPost from './decorators/http-post';
import HttpPut from './decorators/http-put';
import HttpDelete from './decorators/http-delete';
import Middleware from './decorators/middleware';
import HttpResponse from './decorators/http-response';
import Query from './decorators/query';
import RequestBody from './decorators/request-body';
import RequestParam from './decorators/request-param';
import Request from './decorators/request';
import Response from './decorators/response';
import UrlParam from './decorators/url-param';

import getOpenAPIJson from './utils/get-open-api-json';
import setOpenAPIInfo from './utils/set-open-api-info';
import setOpenAPIJsonPath from './utils/set-open-api-json-path';
import setOpenAPITags from './utils/set-open-api-tags';
import useController from './utils/use-controller';

export {
    Controller,
    HttpGet,
    HttpPost,
    HttpPut,
    HttpDelete,
    Middleware,
    HttpResponse,
    Query,
    RequestBody,
    RequestParam,
    Request,
    Response,
    UrlParam,

    getOpenAPIJson,
    setOpenAPIInfo,
    setOpenAPIJsonPath,
    setOpenAPITags,
    useController,

    ExpressRequest,
    ExpressResponse,
}