// src/managers/cart_manager.js
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: uuidv4(), products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts));
        return newCart;
    }

    async getCartById(cid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cid);
        if (!cart) throw new Error('Cart not found');
        return cart;
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cid);
        if (!cart) throw new Error('Cart not found');
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }
        await fs.writeFile(this.path, JSON.stringify(carts));
        return cart;
    }
}

export default CartManager;
