import express, { Request, Response } from 'express';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { handleError } from '../utils/error-handler';
import { CustomerRepository } from '../repository/customer-repository';

const router = express.Router();
const documentClient = new DocumentClient();
const customerRepository = new CustomerRepository(documentClient);

// GET - Retrieve all Customers
router.get('/', async (req: Request, res: Response) => {
  try {
    const customers = await customerRepository.getAll();
    res.json(customers);
  } catch (err) {
    handleError(err, res);
  }
});

// GET - Retrieve a specific Customer by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await customerRepository.getById(id);
    res.json(customer);
  } catch (err) {
    handleError(err, res);
  }
});

// POST - Create a new Customer
router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem = req.body;
    console.log("correlation-id: ", req.headers['correlation-id'], "newItem: ", newItem);
    const createdCustomer = await customerRepository.create(newItem);
    res.json(createdCustomer);
  } catch (err) {
    handleError(err, res);
  }
});

// PUT - Update an existing Customer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    const updatedCustomer = await customerRepository.update(id, updatedItem);
    res.json(updatedCustomer);
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE - Remove a Customer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await customerRepository.delete(id);
    res.json(deletedCustomer);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;

