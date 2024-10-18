import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sendMessage(data) {
    await prisma.message.de({
        data: {
            text: data.text,
            kinderId: data.kinderId,
            sender_name: data.sender_name,
            createdAt: data.createdAt,
            picture: data.picture,
        },
    });
}

export default prisma;