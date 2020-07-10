import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';

import loggerMiddleware from './Middlewares/logger.js';
import mainRoutes from './Routes/main.js';


const app = express();
const port = 3001;
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRoutes);

app.get('*', (request: express.Request, response: express.Response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

export {};