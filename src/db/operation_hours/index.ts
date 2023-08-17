import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function update(data: Prisma.OperationHourUncheckedCreateInput) {
    await prisma.operationHour.create({
        data
    });
}