import { Request, Response, Router } from 'express'

const routes = Router();

routes.post('/users', async (request: Request, response: Response) => {
    const { message }: { message: { user: string, message: string } } = request.body;

    const result = await request.producer.send({
        topic: 'user',
        messages: [
            {
                value: JSON.stringify({
                    user: message.user,
                    message: message.message
                })
            }
        ]
    });
    
    return response.status(201).json({
        sucess: 'ok',
        result: result
    });
});


export default routes;