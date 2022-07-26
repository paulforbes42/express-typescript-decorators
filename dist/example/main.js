"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = __importDefault(require("./controllers/test"));
const __1 = require("../");
const app = (0, express_1.default)();
app.use('/', (0, __1.useController)(test_1.default));
app.listen(4000, () => console.log('Express Application Started'));
