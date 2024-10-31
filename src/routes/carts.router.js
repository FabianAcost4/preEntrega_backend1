// src/routes/carts.router.js
import { Router } from 'express';
import CartManager from '../managers/cart_manager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
