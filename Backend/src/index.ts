import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.routes';
import dotenv from 'dotenv'
import { auth } from './auth/ad';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(routes)

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
