import express, { type Request, type Response } from 'express';
import { SERVER_CONFIG } from './config/server.config';
import cors from 'cors';
import apiRouter from './routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
