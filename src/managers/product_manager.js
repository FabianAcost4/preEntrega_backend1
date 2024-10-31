// src/managers/product_manager.js
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: uuidv4(), status: true, ...product };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products));
        return newProduct;
    }

    async updateProduct(pid, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === pid);
        if (index === -1) throw new Error('Product not found');
        const existingProduct = products[index];
        const newProduct = { ...existingProduct, ...updatedProduct };
        products[index] = newProduct;
        await fs.writeFile(this.path, JSON.stringify(products));
        return newProduct;
    }

    async deleteProduct(pid) {
        const products = await this.getProducts();
        const newProducts = products.filter(p => p.id !== pid);
        if (newProducts.length === products.length) throw new Error('Product not found');
        await fs.writeFile(this.path, JSON.stringify(newProducts));
    }
}

export default ProductManager;
