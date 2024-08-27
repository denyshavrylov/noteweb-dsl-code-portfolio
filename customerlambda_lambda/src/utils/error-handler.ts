import { Response } from 'express';

export function handleError(err: unknown, res: Response): void {
  console.error(err);
  if (err instanceof Error) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send('An unexpected error occurred');
  }
}
