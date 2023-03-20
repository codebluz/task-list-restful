import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TaskController from './controllers/TaskController';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/createUser', UserController.store);

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.put('/updateUser');
routes.get('/tasks', TaskController.index);
routes.post('/createTask', TaskController.store);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.destroy);

export default routes;
