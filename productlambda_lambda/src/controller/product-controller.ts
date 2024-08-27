import express, { Request, Response } from 'express';
import { handleError } from '../utils/error-handler';
import { ProductRepository } from '../repository/product-repository';

const router = express.Router();

// Retrieve all Products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await ProductRepository.findAll();
    res.status(200).json({ data: products });
  } catch (err: any) {
    handleError(err, res);
  }
});

// Retrieve a single Product
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await ProductRepository.findByPk(id);
    if (product) {
      res.status(200).json({ data: product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

// Create a new Product
router.post('/', async (req: Request, res: Response) => {
  const newProduct = req.body;
  console.log("Creating new Product: ", newProduct);
  try {
    const createdProduct = await ProductRepository.create(newProduct);
    res.status(201).json({ data: createdProduct });
  } catch (err: any) {
    handleError(err, res);
  }
});

// Update an existing Product
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  try {
    const product = await ProductRepository.findByPk(id);
    if (product) {
      await product.update(updatedProduct);
      res.status(200).json({ data: product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

// Delete a Product
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedProduct = await ProductRepository.destroy({ where: { id } });
    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

export default router;

