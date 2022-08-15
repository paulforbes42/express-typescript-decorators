import express from 'express';
import HelloWorldController from './controllers/hello-world';
import UserController from './controllers/user';
import {
//    setOpenAPIInfo,
    getOpenAPIJson,
    useController
} from '../'

import cors from 'cors';

/*
setOpenAPIInfo({
    title: "Example Decorator API",
    summary: "A sample Express Application which demostrates the decorator usage",
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
*/

const app = express();

app.use('/', useController(HelloWorldController));
app.use('/api', useController(UserController));
app.get('/api-docs', cors(), getOpenAPIJson());

app.listen(4000, () => console.log('Express Application Started'));