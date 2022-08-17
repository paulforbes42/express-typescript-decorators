# Express TypeScript Decorators

Create Express APIs using TypeScript decorators that naturally generate OpenAPI documentation to describe your API.

[![codecov](https://codecov.io/gh/paulforbes42/express-typescript-decorators/branch/master/graph/badge.svg?token=6A0MACS1AQ)](https://codecov.io/gh/paulforbes42/express-typescript-decorators)

## Overview

* Create classes whose methods represent Express routes
* Decorate your class to add additional Express functionality i.e. `@Controller()`, `@HttpGet`, `@Middleware` etc.
* Further Describe your API with a title and description in `OpenAPI.json`
* Automatically generate OpenAPI JSON documentation
* Link your API documentation to Swagger for rich API documentation tools

[Typedoc Documentation](https://paulforbes42.github.io/express-typescript-decorators/)

# Example Application

Consider the following three examples to see how any Express application can become a fully documented API.

## Example Express Application _before_ using Express TypeScript Decorators

Here is an example of an Express Application without TypeScript.

controllers/user.js
```
const express = require('express');
const UserService = require('../services/user');

const router = express.Router();

router.post('/user', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserService.create(username, password);
        res.status(201).send(user);
    } catch(e) {
        res.send(400);
    }
});

router.get('/user', async (req, res) => {
    const users = await UserService.list();
    res.send(users);
});

module.exports = router;
```

index.js
```
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./src/controllers/user');
const app = express();

app.use(bodyParser.json());

app.use('/api', UserController);
app.listen(3000, () => console.log('Express Application Started!'));
```

## Converting to TypeScript and Decorators

Here's how this same Express Application would be implemented using Decorators and TypeScript

controllers/user.ts
```
import UserService from '../services/user';
import {
    Controller,
    HttpPost,
    HttpGet,
    Response,
    ExpressResponse
} from 'express-typescript-decorators';

@Controller()
class UserController {

    @HttpPost('/user')
    async createUser(
        @RequestParam('username') username: string,
        @RequestParam('password') password: string,
        @Response() res: ExpressResponse
    ): Promise<void> {
        try {
            const user = await UserService.create(username, password);
            res.status(201).send(user);
        } catch(e) {
            res.send(400);
        }
    }

    @HttpGet('/user')
    async listUsers(
        @Response() res: ExpressResponse
    ): Promise<void> {
        const users = await UserService.list();
        res.send(users);
    }
}

export default router;
```

index.ts
```
import express from 'express';
import bodyParser from 'body-parser';
import {useController} from 'express-typescript-decorators';
import UserController from './src/controllers/user';

const app = express();

app.use(bodyParser.json());
app.use('/api', useController(UserController));
app.listen(3000, () => console.log('Express Application Started!'));
```

## Full Swagger API Documentation Example

Taking this example Express Application a step further, we can produce more comprehensive API documentation in our code with the addition of `@HttpReponse`, `@RequestBody` and providing descriptions in calls to `@RequestParam`.  This content naturally flows into Swagger UI.

controllers/user.ts
```
import UserService from '../services/user';
import {
    Controller,
    HttpPost,
    HttpGet,
    HttpResponse,
    RequestBody,
    Response,
    ExpressResponse
} from 'express-typescript-decorators';

@Controller()
class UserController {

    @RequestBody('application/json', 'POST Body that contains all information required to create a user', true)
    @HttpResponse(201, 'User Created Successfully')
    @HttpResponse(400, 'Failed to create user')
    @HttpPost('/user', 'Create a new user for the system')
    async createUser(
        @RequestParam('username', 'Username for the new user record', 'exampleUsername') username: string,
        @RequestParam('password', 'Password for the new user record', 'Pa33w0rd') password: string,
        @Response() res: ExpressResponse
    ): Promise<void> {
        try {
            const user = await UserService.create(username, password);
            res.status(201).send(user);
        } catch(e) {
            res.send(400);
        }
    }

    @HttpGet('/user', 'Generate a list of users in the system')
    async listUsers(
        @Response() res: ExpressResponse
    ): Promise<void> {
        const users = await UserService.list();
        res.send(users);
    }
}

export default router;
```

index.ts
```
import express from 'express';
import bodyParser from 'body-parser';
import {
    getOpenAPIJson,
    setOpenAPIInfo,
    useController,
} from 'express-typescript-decorators';
import UserController from './src/controllers/user';

const app = express();

setOpenAPIInfo({
    title: "Example User API",
    summary: "A sample Express Application to create and list users",
    description: "This sample Express Application demonstrates usage of decorators to create Express Routers called 'controllers' from Classes.  Methods of the class can represent the routes of the Express Application when correctly decorated.  Optionally, OpenAPI documentation can be generated to describe the API.",
    contact: {
        name: "Paul Forbes",
        email: "paulforbes42@gmail.com"
    },
    license: {
        name: "Apache 2.0",
        identifier: 'Apache-2.0',
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    version: "0.0.1"
});

app.use(bodyParser.json());
app.use('/api', useController(UserController));
app.use('/api-docs', getOpenApiJson());
app.listen(3000, () => console.log('Express Application Started!'));
```

Navigating to `http://localhost:3000/api-docs` will provide a JSON representation of the OpenAPI documentation you've created directly from
the code for your API.

#  TypeScript configuration tsconfig.json

The following configurations will need to be enabled in `tsconfig.json` for your project order for the decorators to appropriately
capture metadata from you controllers and routes.

tsconfig.json
```
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

# Decorators and Utility Methods

The ulitmate goal of this package is to allow a clean and consistent interface to provide rich OpenAPI documentation around your API while, alternatively,
supporting a simple approach to define class based Express routers in TypeScript.  Observe the following Decorators and utility methods at your disposal.
The more optional information you provide about each route, the more content which will be available in your OpenAPI JSON file which can be consumed by
Swagger UI for an always up-to-date API documentation site.

## Decorators

### Controller

▸ **@Controller**<`T`\>(`path?`, `tag?`, `description?`)

Class decorator used for classes that represent a grouping of Express routes

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {
 ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path?` | `string` | URL path to prefix all Express routes within the class |
| `tag?` | `string` | OpenAPI grouping for all Express routes within the class |
| `description?` | `string` | OpenAPI description that will be associated with the tag for this class |

___

### HttpDelete

▸ **@HttpDelete**<`T`\>(`path`, `description?`)

Method decorator that indicates the method should be accessible through an HTTP Delete operation

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpDelete('/user', 'Mark a user as deleted')
 async deleteUser(
   @RequestParam('userId') userId: number, 
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | URL which this method should be access through as a HTTP Delete operation |
| `description?` | `string` | Description of this route to be included in the OpenAPI documentation |

___

### HttpGet

▸ **@HttpGet**<`T`\>(`path`, `description?`)

Method decorator that indicates the method should be accessible through an HTTP Get operation

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpGet('/user', 'List users in the system')
 async listUsers(
   @Query('search') search: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | URL which this method should be access through as a HTTP Get operation |
| `description?` | `string` | Description of this route to be included in the OpenAPI documentation |

___

### HttpPost

▸ **@HttpPost**<`T`\>(`path`, `description?`)

Method decorator that indicates the method should be accessible through an HTTP Post operation

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpPost('/user', 'Create a new user')
 async createUser(
   @RequestParam('username') username: string,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | URL which this method should be access through as a HTTP Post operation |
| `description?` | `string` | Description of this route to be included in the OpenAPI documentation |

___

### HttpPut

▸ **@HttpPut**<`T`\>(`path`, `description?`)

Method decorator that indicates the method should be accessible through an HTTP Put operation

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpPut('/user/:userId', 'Update an existing user')
 async createUser(
   @UrlParam('userId') userId: number,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | URL which this method should be access through as a HTTP Put operation |
| `description?` | `string` | Description of this route to be included in the OpenAPI documentation |

___

### HttpResponse

▸ **@HttpResponse**<`T`\>(`statusCode`, `description`)

Method decorator which describes an HTTP status code that can be returned by this Express route.
This decorator can be applied multiple times to a single Express route to describe all status codes produced by this route.

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpResponse(201, 'New user record created')
 @HttpResponse(400, 'Missing required data')
 @HttpPost('/user', 'Create a new user')
 async createUser(
   @RequestParam('username') username: string,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statusCode` | `number` | HTTP status code |
| `description` | `string` | Description of the scenario in which this HTTP status code will be produced |

___

### Middleware

▸ **@Middleware**<`T`\>(`middleware`)

Method decorator which accepts an array of Express middleware callback functions to run prior to the Express route being executed

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @Middleware([verifyAuthenticated, checkAdminPermissions])
 @HttpPost('/user', 'Create a new user')
 async createUser(
   @RequestParam('username') username: string,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middleware` | (`req`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>, `next?`: `NextFunction`) => `void`[] | Array of Express middleware callback functions |

___

### Query

▸ **@Query**<`T`\>(`key`, `summary?`, `exampleValue?`, `required?`, `deprecated?`)

Parameter decorator which defines a query string parameter to be provided to the Express route

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpGet('/user', 'List users in the system')
 async listUsers(
   @Query('search', 'Search string to lookup users by first or last name', 'Paul', false, false) search: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | name of parameter in the query string |
| `summary?` | `string` | description of the parameter for OpenAPI documentation |
| `exampleValue?` | `string` \| `number` \| `boolean` | example of expected data |
| `required?` | `boolean` | indicate if this parameter is required |
| `deprecated?` | `boolean` | indicate if this parameter is deprecated |

___

### Request

▸ **@Request**<`T`\>()

Parameter decorator which injects the Express Request object into the decorated Express route

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpGet('/user', 'List users in the system')
 async listUsers(
   @Query('search') search: string,
   @Request() req: ExpressRequest,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `propertyKey` | `string` |
| `parameterIndex` | `number` |

___

### RequestBody

▸ **@RequestBody**<`T`\>(`contentType`, `description?`, `required?`)

Method decorator to describe the expected request payload

**`Example`**

```
 * @Controller('/api', 'User', 'User Management Routes')
class User {

 @RequestBody('application/json', 'User information for new user record', true) 
 @HttpPost('/user', 'Create a new user')
 async createUser(
   @RequestParam('username') username: string,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentType` | `string` | content type of payload i.e. "application/json" |
| `description?` | `string` | description of the payload for OpenAPI documentation |
| `required?` | `boolean` | indicate if the payload is required |

___

### RequestParam

▸ **@RequestParam**<`T`\>(`key`, `summary?`, `exampleValue?`, `required?`)

Parameter decorator which defines a request body parameter to be provided to the Express route

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpPut('/user/:userId', 'Update an existing user')
 async createUser(
   @UrlParam('userId') userId: number,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | name of parameter in request body |
| `summary?` | `string` | description of the parameter for OpenAPI documentation |
| `exampleValue?` | `string` \| `number` \| `boolean` | example of expected data |
| `required?` | `boolean` | indicate if this parameter is required |

___

### Response

▸ **@Response**<`T`\>()

Parameter decorator which injects the Express Response object into the decorated route

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpGet('/user', 'List users in the system')
 async listUsers(
   @Query('search') search: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

___

### UrlParam

▸ **@UrlParam**<`T`\>(`key`, `summary?`, `exampleValue?`)

Parameter decorator which defines a url parameter to be provided to the Express route

**`Example`**

```
@Controller('/api', 'User', 'User Management Routes')
class User {

 @HttpPut('/user/:userId', 'Update an existing user')
 async createUser(
   @UrlParam('userId') userId: number,
   @RequestParam('password') password: string,
   @Response() res: ExpressResponse
 ): Promise<void> { 
   ... 
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | name of parameter in request body |
| `summary?` | `string` | description of the parameter for OpenAPI documentation |
| `exampleValue?` | `string` \| `number` \| `boolean` | example of expected data |

___

## Functions

### getOpenAPIJson

▸ **getOpenAPIJson**(): (`req`: `Request`, `res`: `Response`) => `void`

Return an Express route which will render the OpenAPI documentation for the API in JSON format.

**`Example`**

```
app.use('/api-docs', getOpenAPIJson());
```

#### Returns

`fn`

Get API method

▸ (`req`, `res`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |
| `res` | `Response` |

##### Returns

`void`

___

### setOpenAPIInfo

▸ **setOpenAPIInfo**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `OpenAPIInfo` |

#### Returns

`void`

___

### setOpenAPIJsonPath

▸ **setOpenAPIJsonPath**(`path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

___

### useController

▸ **useController**(`controller`): `Router`

Utility Method to map a controller class be used by Express

**`Example`**

```
app.use('/', useController(UserController));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controller` | `any` | Controller class |

#### Returns

`Router`

Express Router object with associated routes

# OpenAPI.json

You can further expand your OpenAPI documentation with a static file that includes most fields in the OpenAPI Object (see below).
By default the system will look for `<rootdir>/OpenAPI.json`.  This path can be overwritten to a custom location with `setOpenAPIJsonPath(path: string)`.
When this file is detected, calls to `setOpenAPIInfo()` and `setOpenAPITags()` will be ignored.

## OpenAPI Object Reference

http://spec.openapis.org/oas/v3.1.0
```
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
```

## OpenAPI.json example

./OpenAPI.json
```
{
    "info": {
        "title": "Example Decorator API",
        "summary": "A sample Express Application which demostrates the decorator usage",
        "description": "This sample Express Application demonstrates usage of decorators to create Express Routers called 'controllers' from Classes.  Methods of the class can represent the routes of the Express Application when correctly decorated.  Optionally, OpenAPI documentation can be generated to describe the API.",
        "contact": {
            "name": "Paul Forbes",
            "email": "paulforbes42@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "identifier": "Apache-2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "0.0.1"
    }
}
```

# Development

NPM scripts to assist in development of this project.

* `npm run build` clean up branch, run unit tests and lint to prepare for PR
* `npm run clean` remove the `dist` directory
* `npm run dev` run the TypeScript compiler in watch mode
* `npm run docs` generate Typedoc site in `docs` directory
* `npm run lint` execute eslint validation
* `npm run test` execute unit tests