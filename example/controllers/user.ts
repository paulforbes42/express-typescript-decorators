import {
    Controller,
    HttpGet,
    HttpPost,
    HttpResponse,
    Query,
    RequestBody,
    RequestParam,
    Response,
    ExpressResponse,
} from '../../src';

@Controller('/user', 'user', 'Create and manage users in the system')
class UserController {

    @RequestBody('application/json', 'User information about the user to be added to the system', true)
    @HttpResponse(201, 'User Created')
    @HttpResponse(400, 'Invalid Request Data')
    @HttpResponse(403, 'Validation Failed')
    @HttpResponse(409, 'Email Aready Exists')
    @HttpPost('/', 'Create a new user')
    async createUser(
        @RequestParam('email', 'User\'s email address', 'user@example.com', true) email: string,
        @RequestParam('password', 'Valid password', 'L1m1t3dAcc355', true) password: string,
        @RequestParam('firstName', 'User\'s first name', 'Paul', true) firstName: string,
        @RequestParam('lastName', 'User\'s last name', 'Forbes', true) lastName: string,
        @Response() res: ExpressResponse
    ): Promise<void> {

    }

    @HttpResponse(200, 'Success')
    @HttpResponse(500, 'Internal Error')
    @HttpGet('/', 'List users in the system')
    async listUsers(
        @Query('active', 'Filter users by active status', 'true', false) active: boolean,
        @Query('name', 'Search users by first or last name', 'Forbes', false) nameSearch: string,
        @Response() res: ExpressResponse
    ): Promise<void> {

    }
}

export default UserController