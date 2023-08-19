import { FastifyInstance } from "fastify";

import { registerCustomer } from "../../controllers/customers/register";

export async function customerRoutes(app: FastifyInstance) {
    app.post('/customers', registerCustomer);
}