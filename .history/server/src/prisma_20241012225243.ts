import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sendMessage() {
    await prisma.message.deleteMany({
       
    });
    console.log();
    
}

export default prisma;