import express, { Request, Response } from 'express';
import { handleError } from '../utils/error-handler';
import { {{ entity.class }}Repository } from '../repository/{{ entity.class | lower }}-repository';

const router = express.Router();

// Retrieve all {{ entity.class }}s
router.get('/', async (req: Request, res: Response) => {
  try {
    const {{ entity.class | lower }}s = await {{ entity.class }}Repository.findAll();
    res.status(200).json({ data: {{ entity.class | lower }}s });
  } catch (err: any) {
    handleError(err, res);
  }
});

// Retrieve a single {{ entity.class }}
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const {{ entity.class | lower }} = await {{ entity.class }}Repository.findByPk(id);
    if ({{ entity.class | lower }}) {
      res.status(200).json({ data: {{ entity.class | lower }} });
    } else {
      res.status(404).json({ message: '{{ entity.class }} not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

// Create a new {{ entity.class }}
router.post('/', async (req: Request, res: Response) => {
  const new{{ entity.class }} = req.body;
  console.log("Creating new {{ entity.class }}: ", new{{ entity.class }});
  try {
    const created{{ entity.class }} = await {{ entity.class }}Repository.create(new{{ entity.class }});
    res.status(201).json({ data: created{{ entity.class }} });
  } catch (err: any) {
    handleError(err, res);
  }
});

// Update an existing {{ entity.class }}
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const updated{{ entity.class }} = req.body;
  try {
    const {{ entity.class | lower }} = await {{ entity.class }}Repository.findByPk(id);
    if ({{ entity.class | lower }}) {
      await {{ entity.class | lower }}.update(updated{{ entity.class }});
      res.status(200).json({ data: {{ entity.class | lower }} });
    } else {
      res.status(404).json({ message: '{{ entity.class }} not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

// Delete a {{ entity.class }}
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted{{ entity.class }} = await {{ entity.class }}Repository.destroy({ where: { id } });
    if (deleted{{ entity.class }}) {
      res.status(200).json({ message: '{{ entity.class }} deleted successfully' });
    } else {
      res.status(404).json({ message: '{{ entity.class }} not found' });
    }
  } catch (err: any) {
    handleError(err, res);
  }
});

export default router;

