import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handleCartSave(checkoutToken, productIds) {
    const newSavedCart = prisma.savedCart.upsert({
        where: { checkoutToken: checkoutToken },
        update: { productIds },
        create: {
            checkoutToken,
            productIds,
        }
    });
    return newSavedCart;
}

export async function handleCartRestore(checkoutToken) {
    const foundSavedCart = prisma.savedCart.findUnique({
        where: { checkoutToken }
    });
    return foundSavedCart;
}