import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUsersPaginated,
  registerUser,
  updateUser,
} from '../controllers/user-controller';
import validateResource from '../middleware/validate-resource';
import { createUserSchema } from '../schema/user-schema';

const router = Router();

router.post('/register', validateResource(createUserSchema), registerUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);

// router.get('/', getAllUsers);
router.get('/', getUsersPaginated);

export default router;
