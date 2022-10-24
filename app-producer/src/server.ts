import express, { NextFunction, Request, Response } from 'express';

import routes from './routes';
import { producer } from './kafka'

const PORT = process.env.PORT || 3000;
const server = express();

server.use((req: Request, res: Response, next: NextFunction) => {
    req.producer = producer;
    next();
});

server.use(express.json());
server.use(routes);

const start = async () => {
    await producer.connect()
    server.listen(PORT);
}

start()
    .then(() => console.log(`Producer is running in ${PORT}`))
    .catch(error => console.log(error));

    
