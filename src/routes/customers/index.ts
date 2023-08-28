import { FastifyInstance } from "fastify";

import { deleteCustomer } from "../../controllers/customers/delete";
import { loginAsCustomer } from "../../controllers/customers/login";
import { registerCustomer } from "../../controllers/customers/register";
import { editCustomerData } from "../../controllers/customers/edit-data";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

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

    app.delete(
        '/customers',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware,
            ]
        },
        deleteCustomer
    );
}