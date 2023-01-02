import { Response, Request, NextFunction } from 'express';
import { Todos, TodoWithId } from './todos.model';

export async function findAll(
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction,
) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (error) {
    next(error);
  }
}
