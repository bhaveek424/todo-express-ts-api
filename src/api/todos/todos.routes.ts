import { Router } from 'express';

import * as TodoHandlers from './todos.handler';

const router = Router();

router.get('/', TodoHandlers.findAll);
router.post('/', TodoHandlers.createOne);

export default router;
