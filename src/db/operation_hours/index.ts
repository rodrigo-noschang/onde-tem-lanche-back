import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function createHour(data: Prisma.OperationHourUncheckedCreateInput[]) {
    await prisma.operationHour.createMany({
        data
    });
}