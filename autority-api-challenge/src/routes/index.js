import { Router } from 'express';

import * as homeController from '@/controllers/home';
import * as todoController from '@/controllers/todo.controller';
import { createTodoSchema } from '@/validators';
import { checkSchema } from 'express-validator';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

router.get('/tasks', todoController.index);
router.post('/tasks', checkSchema(createTodoSchema), todoController.create);
router.get('/tasks/:id', todoController.findOne);
router.put('/tasks/:id', checkSchema(createTodoSchema), todoController.update);
router.delete('/tasks/:id', todoController.destroy);

export default router;
