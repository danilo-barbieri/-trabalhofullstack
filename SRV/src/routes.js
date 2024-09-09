import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import auth from './middlewares/auth';

const router = Router();

router.post('/createusers', UserController.createUser);
router.get('/listusers', UserController.findAllUser);
router.get('/listusers/:userId', UserController.findUser);
router.post('/session', SessionController.createSession);
router.put('/users/:userId', UserController.updateUser);
router.get('/userprofile', auth,UserController.getProfile);

export { router }