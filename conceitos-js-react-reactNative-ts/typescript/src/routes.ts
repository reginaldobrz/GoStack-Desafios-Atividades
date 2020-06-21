import { Request,Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response){
    const user = createUser({
        email:'reginaldo-aguiar@hotmail.com', 
        password:'123456',
        techs:[
            'node',
            'react',
            'type',
            { title: 'javascript', experience:100},
        ],
    });

    return response.json({ message: 'Hello World' });
}