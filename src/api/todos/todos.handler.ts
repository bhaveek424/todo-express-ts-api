import { Response, Request, NextFunction } from 'express';
import { InsertOneResult } from 'mongodb';
import { Todo, Todos, TodoWithId } from './todos.model';

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

export async function createOne(
  req: Request<{}, InsertOneResult<Todo>, Todo>,
  res: Response<InsertOneResult<Todo>>,
  next: NextFunction,
) {
  try {
    const validateResult = await Todo.parse(req.body);
    const insertResult = await Todos.insertOne(validateResult);
    res.json(insertResult);
  } catch (error) {
    next(error);
  }
}
