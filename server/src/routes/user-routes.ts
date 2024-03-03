import { Router } from 'express';
import { getAllUsers, getUser, registerUser } from '../controllers/user-controller';
import validateResource from '../middleware/validate-resource';
import { createUserSchema } from '../schema/user-schema';

const router = Router();

router.post('/register', validateResource(createUserSchema), registerUser);

router.get('/:id', getUser);

router.get('/', getAllUsers);

export default router;
