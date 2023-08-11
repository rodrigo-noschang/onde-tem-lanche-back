import express from 'express';

import { customerRoutes } from './routes/customers/index.js';

export const app = express();

app.use(customerRoutes);