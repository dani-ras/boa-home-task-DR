import express from 'express'
import { handleCartRestore, handleCartSave } from './services.js';
const router = express.Router()

router.get("/restore/:checkoutToken", async (req, res) => {
    try {
        const { checkoutToken } = req.params;
        if (!checkoutToken) {
            return res.status(400).send();
        }
        const savedCart = await handleCartRestore(checkoutToken);
        return res.status(200).setHeader('Content-Type', 'application/json').json(savedCart);
    } catch (error) {
        return res.status(500).send();
    }
})

router.post("/save", async (req, res) => {
    try {
        const { checkoutToken, productIds } = req.body;
        if (!checkoutToken || !productIds) {
            return res.status(400).send();
        }
        const savedCart = await handleCartSave(checkoutToken, productIds);
        return res.status(201).setHeader('Content-Type', 'application/json').json(savedCart);
    } catch (error) {
        console.log("error", error);
        return res.status(500).send();
    }
})

export default router