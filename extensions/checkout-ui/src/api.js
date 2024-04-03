const BASE_URL = 'https://commerce-dh-cycling-fr.trycloudflare.com'

export async function saveForLater(checkoutToken, productIds) {
    try {
        const res = await fetch(BASE_URL + "/api/cart/save",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checkoutToken,
                    productIds,
                }),
            })
        return res

    } catch (error) {
        console.log("error while trying to save cart", error);
    }
}

export async function cartRestore(checkoutToken, shopDomain) {
    try {
        const res = await fetch(BASE_URL + `/api/cart/restore/${checkoutToken}`)
        return res

    } catch (error) {
        console.log("error while trying to restore cart", error);
    }
}