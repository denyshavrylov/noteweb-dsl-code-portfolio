"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const error_handler_1 = require("../utils/error-handler");
const customer_repository_1 = require("../repository/customer-repository");
const router = express_1.default.Router();
const documentClient = new dynamodb_1.DocumentClient();
const customerRepository = new customer_repository_1.CustomerRepository(documentClient);
// GET - Retrieve all Customers
router.get('/', async (req, res) => {
    try {
        const customers = await customerRepository.getAll();
        res.json(customers);
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// GET - Retrieve a specific Customer by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerRepository.getById(id);
        res.json(customer);
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// POST - Create a new Customer
router.post('/', async (req, res) => {
    try {
        const newItem = req.body;
        console.log("correlation-id: ", req.headers['correlation-id'], "newItem: ", newItem);
        const createdCustomer = await customerRepository.create(newItem);
        res.json(createdCustomer);
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// PUT - Update an existing Customer
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = req.body;
        const updatedCustomer = await customerRepository.update(id, updatedItem);
        res.json(updatedCustomer);
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
// DELETE - Remove a Customer
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await customerRepository.delete(id);
        res.json(deletedCustomer);
    }
    catch (err) {
        (0, error_handler_1.handleError)(err, res);
    }
});
exports.default = router;
