import { Response, Request } from 'express';
import { Todos, TodoWithId } from './todos.model';

export async function findAll(req: Request, res: Response<TodoWithId[]>) {
  const result = await Todos.find();
  const todos = await result.toArray();
  res.json(todos);
}
