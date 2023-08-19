import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveCustomer(data: Prisma.CustomerCreateInput) {
    await prisma.customer.create({
        data
    });
}

export async function findUniqueCustomerByEmail(email: string) {
    const existingEmail = await prisma.customer.findFirst({
        where: {
            email
        }
    })

    return existingEmail;
}