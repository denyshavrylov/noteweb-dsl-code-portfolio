"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../utils/error-handler");
const product_repository_1 = require("../repository/product-repository");
const router = express_1.default.Router();
// Retrieve all Products
router.get('/', async (req, res) => {
    try {
        const products = await product_repository_1.ProductRepository.findAll();
        res.status(200).json({ data: products });
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// Retrieve a single Product
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await product_repository_1.ProductRepository.findByPk(id);
        if (product) {
            res.status(200).json({ data: product });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// Create a new Product
router.post('/', async (req, res) => {
    const newProduct = req.body;
    console.log("Creating new Product: ", newProduct);
    try {
        const createdProduct = await product_repository_1.ProductRepository.create(newProduct);
        res.status(201).json({ data: createdProduct });
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// Update an existing Product
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    try {
        const product = await product_repository_1.ProductRepository.findByPk(id);
        if (product) {
            await product.update(updatedProduct);
            res.status(200).json({ data: product });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// Delete a Product
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProduct = await product_repository_1.ProductRepository.destroy({ where: { id } });
        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
exports.default = router;
