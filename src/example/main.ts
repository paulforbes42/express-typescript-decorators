import express from 'express';
import TestController from './controllers/test';
import {useController} from '../'

const app = express();

app.use('/', useController(TestController));

app.listen(4000, () => console.log('Express Application Started'));

