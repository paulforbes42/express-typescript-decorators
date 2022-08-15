"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_world_1 = __importDefault(require("./controllers/hello-world"));
const user_1 = __importDefault(require("./controllers/user"));
const __1 = require("../");
const cors_1 = __importDefault(require("cors"));
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
const app = (0, express_1.default)();
app.use('/', (0, __1.useController)(hello_world_1.default));
app.use('/api', (0, __1.useController)(user_1.default));
app.get('/api-docs', (0, cors_1.default)(), (0, __1.getOpenAPIJson)());
app.listen(4000, () => console.log('Express Application Started'));
