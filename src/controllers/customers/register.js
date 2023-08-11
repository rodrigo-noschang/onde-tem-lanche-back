import { prisma } from "../../db/index.js";

export async function registerCustomer(req, res) {
    const customer = await prisma.customer.findFirst();

    return res.json({
        customer
    })
}