import { Router } from 'express';

import * as TodoHandlers from './todos.handler';

const router = Router();

router.get('/', TodoHandlers.findAll);

export default router;
