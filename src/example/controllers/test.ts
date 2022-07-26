import {Request, Response} from 'express';
import {
    Controller,
    HttpGet,
} from '../../index';

@Controller
class TestController {

    text: string = 'Hello, World!';

    @HttpGet('/')
    async helloWorld(req: Request, res: Response): Promise<void> {
        res.send(this.text);
    }

    @HttpGet('/second')
    async helloWorld2(req: Request, res: Response): Promise<void> {
        res.send(this.text + ' 2x');
    }
}

export default TestController;