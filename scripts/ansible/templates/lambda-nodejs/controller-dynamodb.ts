import express, { Request, Response } from 'express';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { handleError } from '../utils/error-handler';
import { {{ entity.class }}Repository } from '../repository/{{ entity.class | lower }}-repository';

const router = express.Router();
const documentClient = new DocumentClient();
const {{ entity.class | lower }}Repository = new {{ entity.class }}Repository(documentClient);

// GET - Retrieve all {{ entity.class }}s
router.get('/', async (req: Request, res: Response) => {
  try {
    const {{ entity.class | lower }}s = await {{ entity.class | lower }}Repository.getAll();
    res.json({{ entity.class | lower }}s);
  } catch (err) {
    handleError(err, res);
  }
});

// GET - Retrieve a specific {{ entity.class }} by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {{ entity.class | lower }} = await {{ entity.class | lower }}Repository.getById(id);
    res.json({{ entity.class | lower }});
  } catch (err) {
    handleError(err, res);
  }
});

// POST - Create a new {{ entity.class }}
router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem = req.body;
    console.log("correlation-id: ", req.headers['correlation-id'], "newItem: ", newItem);
    const created{{ entity.class }} = await {{ entity.class | lower }}Repository.create(newItem);
    res.json(created{{ entity.class }});
  } catch (err) {
    handleError(err, res);
  }
});

// PUT - Update an existing {{ entity.class }}
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    const updated{{ entity.class }} = await {{ entity.class | lower }}Repository.update(id, updatedItem);
    res.json(updated{{ entity.class }});
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE - Remove a {{ entity.class }}
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted{{ entity.class }} = await {{ entity.class | lower }}Repository.delete(id);
    res.json(deleted{{ entity.class }});
  } catch (err) {
    handleError(err, res);
  }
});

export default router;

