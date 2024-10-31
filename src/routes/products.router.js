// src/routes/products.router.js
import { Router } from 'express';
import ProductManager from '../managers/product_manager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

// GET /api/products/
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products/
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    try {
        const newProduct = await productManager.createProduct({ title, description, code, price, stock, category, thumbnails });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updateData = req.body;

    try {
        const updatedProduct = await productManager.updateProduct(pid, updateData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.status(200).json({ message: `Product with id ${pid} deleted successfully` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
