import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveCustomer(data: Prisma.CustomerCreateInput) {
    await prisma.customer.create({
        data
    });
}

export async function findUniqueCustomerById(customerId: string) {
    const customer = await prisma.customer.findUnique({
        where: {
            customer_id: customerId
        }
    })

    return customer;
}

export async function findUniqueCustomerByEmail(email: string) {
    const existingEmail = await prisma.customer.findFirst({
        where: {
            email
        }
    })

    return existingEmail;
}

export async function findManyCustomersByEmail(email: string) {
    const emails = await prisma.customer.count({
        where: {
            email
        }
    })

    return emails;
}

export async function updateCustomerData(data: Prisma.CustomerUpdateInput, customer_id: string) {
    await prisma.customer.update({
        where: {
            customer_id
        },
        data
    })
}

export async function removeCustomerById(customerId: string) {
    await prisma.customer.delete({
        where: {
            customer_id: customerId
        }
    })
}