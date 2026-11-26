import express from 'express';

import AuthController from '../controllers/auth.controller.ts';
import requireLogged from '../middleware/auth.ts';

const AuthRouter = express.Router();

AuthRouter.use(express.json());

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.get('/session', requireLogged, AuthController.session);

export default AuthRouter;
