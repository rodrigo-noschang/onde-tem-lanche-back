const restaurantes = [
    {
        nome: "Fornetto",
        descricao: "Restaurante Pizzaria"
    },
    {
        nome: "La Tosca",
        descricao: "Restaurante de comida italiana"
    }
]

import express, { json } from 'express';

import { customerRoutes } from './routes/customers/index.js';

export const app = express();
app.use(express.json());

app.use(customerRoutes);