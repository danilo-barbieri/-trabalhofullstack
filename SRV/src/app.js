import express from 'express';
import { router } from './routes';

const cors = require('cors'); // Importando CORS
const app = express();

// Habilita CORS para todas as rotas
app.use(cors({
    origin: 'http://localhost:3000', // Permite apenas essa origem
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
}));

app.use(express.json());

app.use(router);
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});