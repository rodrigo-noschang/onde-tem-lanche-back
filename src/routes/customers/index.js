import { Router } from "express";

import { registerCustomer } from "../../controllers/customers/register.js";

export const customerRoutes = Router()

customerRoutes
    .route('/customers')
    .get(registerCustomer);