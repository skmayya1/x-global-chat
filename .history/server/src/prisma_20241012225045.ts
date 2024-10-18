import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function clearDatabase() {
    await prisma.$executeRaw`TRUNCATE TABLE "Message" CASCADE`; // Add other tables as needed
    console.log("Database cleared.");
}


export default prisma;