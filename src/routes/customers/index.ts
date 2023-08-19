import { FastifyInstance } from "fastify";

import { loginAsCustomer } from "../../controllers/customers/login";
import { registerCustomer } from "../../controllers/customers/register";
import { editCustomerData } from "../../controllers/customers/edit-data";

import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { isCustomerMiddleware } from "../../middlewares/isCustomer";

export async function customerRoutes(app: FastifyInstance) {
    app.post('/customers', registerCustomer);
    app.post('/customers/session', loginAsCustomer);

    app.put(
        '/customers',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware
            ]
        },
        editCustomerData
    )
}