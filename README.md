# Express TypeScript Decorators

Simply create Express APIs with TypeScript that are naturally documented in Swagger.

* Create Classes that represent Express routes and APIs
* Augment the classes with TypeScript decorators such as `@Controller`, `@HttpGet` and `@Middleware`
* Describe your API `OpenAPI.json` to define a title and description of the system
* Automatically generate OpenAPI JSON documentation
* Link your API to Swagger for rich API documentation tools

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

### Http Verbs

* `@HttpDelete(path: string, description?: string)` Convert to a http _delete_ route.
** `path` represents the URL to access this resource.  
** `description` will be included in your OpenAPI documentation.

* `@HttpGet(path: string, description?: string)` Convert to a http _get_ route.  
** `path` represents the URL to access this resource.  
** `description` will be included in your OpenAPI documentation.

* `@HttpPost(path: string, description?: string)` Convert to a http _post_ route.  
** `path` represents the URL to access this resource.  
** `description` will be included in your OpenAPI documentation.

* `@HttpPut(path: string, description?: string)` Convert to a http _put_ route.  
** `path` represents the URL to access this resource.  
** `description` will be included in your OpenAPI documentation.

### Express Functionality

* `@Controller(path?: string, tag?: string)` Decorator for your controller class.
** `path` optional url to prefix onto all of the routes within your class
** `tag` optional tag to group the routes in your class with in your OpenAPI documentation

* `@Middleware(middleware: Function[])` Array of middleware functions to associate with a route.  
** `middleware` Each function's signature should match `(req: Request, res: Response, next?: NextFunction) => void`

* `@Query(key: string, summary?: string, exampleValue?: string, required?: boolean, deprecated?: boolean)` Parameter Decorator to inject a value from the `Request.query` (query string of the url) into the route as a parameter.
** `key` is the name of the parameter from the query string in the url.  
** `summary` allows a textual description of the parameter.  
** `exampleValue` demonstrates the expected type of data.  
** `required` can be set when a specific parameter of the query string in the url must be provided.
** `deprecated` indicate if this parameter is deprecated

* `@Request()` Parameter Decorator to inject Express Request object into a route.  Provides type `ExpressRequest`.

* `@Response()` Parameter Decorator to inject Express Response object into a route.  Provides type `ExpressResponse`.

* `@RequestParam(key: string, summary?: string, exampleValue?: string, required?: boolean)` Parameter Decorator to inject a value from the `Request.body` into the route as parameter. 
** `key` is the name of the parameter from the request's payload.  
** `summary` allows a textual description of the parameter.  
** `exampleValue` demonstrates the expected type of data.  
** `required` can be set when a specific parameter of the request's payload must be provided.

### OpenAPI Documentation Decorators

* `@HttpResponse(statusCode: number, description?: string)` Document status codes that can be returned by this route. Provide multiple `@HttpResponse` decorators per route to declare multiple possible http status codes that can be returned.
** `statusCode` is the http status code to be documented.  
** `description` optionally can describe the scenario where this status code will be returned.  

* `@RequestBody(contentType: string, description?: string, required?: boolean)` Document the request payload expected by this route.  
** `contentType` represents the expected content type header expected i.e. `application/json`.  
** `description` allows for describing the structure or purpose of the payload.  
** `required` documents if this payload is expected.

## Utility Methods

* `useController(controller: Class)` Converts a decorated controller into an `express.Router` to be associated with the Express Application.

* `getOpenAPIJson()` Get an Express route that will return OpenAPI documentation in JSON format.

* `setOpenAPIJsonPath(path: string)` Redefine the file path to `OpenAPI.json`.  Default `<rootdir>/OpenAPI.json`.
** `path` file path to OpenAPI.json

* `setOpenAPIInfo(info: OpenAPIInfo)` Further describe your API in the generated OpenAPI documentation.

```
type OpenAPIInfo = {
    title: string
    version: string
    summary?: string
    description?: string
    termsOfService?: string
    contact?: OpenAPIContact
    license?: OpenAPILicense
};
```

* `setOpenAPITags(tags: string[] | OpenAPITag[])` Further describe your API in the generated OpenAPI documentation.

```
export type OpenAPITag = {
    name: string
    description?: string
    externalDocs?: OpenAPIExternalDocumentation
};
```

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

NPM scripts to assist in development:

* `npm run build` clean up branch, run unit tests and lint to prepare for PR
* `npm run clean` remove the `dist` directory
* `npm run dev` run the TypeScript compiler in watch mode
* `npm run docs` generate Typedoc site in `docs` directory
* `npm run lint` execute eslint validation
* `npm run test` execute unit tests