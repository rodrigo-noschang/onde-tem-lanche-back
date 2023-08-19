import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function createHour(data: Prisma.OperationHourUncheckedCreateInput[]) {
    await prisma.operationHour.createMany({
        data
    });
}

export async function findManyHoursByRestaurantId(restaurant_id: string) {
    const hours = await prisma.operationHour.findMany({
        where: {
            restaurant_id
        }
    })

    return hours;
}