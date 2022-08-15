import {
    Controller,
    HttpGet,
    HttpResponse,
    Response,
    ExpressResponse,
} from '../../index';

@Controller()
class HelloWorldController {

    text: string = 'Hello, World!';

    @HttpGet('/', 'Get a Hello World')
    @HttpResponse(200, 'Success')
    async helloWorld(
        @Response() res: ExpressResponse
    ): Promise<void> {
        res.send(this.text);
    }

    @HttpGet('/second', 'Get another Hello World')
    @HttpResponse(200, 'Success')
    async helloWorld2(
        @Response() res: ExpressResponse
    ): Promise<void> {
        res.send(this.text + ' 2x');
    }
}

export default HelloWorldController;