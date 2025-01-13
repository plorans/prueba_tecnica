import express from 'express';
import cors from 'cors';
import usuarioRuta from '../src/routes/usuarioRuta.js';
import { verifyToken } from './controllers/usuarioController.js';

const port = 5002;
const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', usuarioRuta);


app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

