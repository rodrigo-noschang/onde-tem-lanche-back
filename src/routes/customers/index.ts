import { FastifyInstance } from "fastify";

import { loginAsCustomer } from "../../controllers/customers/login";
import { registerCustomer } from "../../controllers/customers/register";

export async function customerRoutes(app: FastifyInstance) {
    app.post('/customers', registerCustomer);
    app.post('/customers/session', loginAsCustomer);
}