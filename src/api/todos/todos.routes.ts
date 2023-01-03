import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';

import * as TodoHandlers from './todos.handler';
import { Todo } from './todos.model';

const router = Router();

router.get('/', TodoHandlers.findAll);

router.post(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TodoHandlers.findOne,
);
router.post(
  '/',
  validateRequest({
    body: Todo,
  }),
  TodoHandlers.createOne,
);

export default router;
