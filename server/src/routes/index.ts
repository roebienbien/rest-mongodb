import { Router } from 'express';
import user from './user-routes';

const router = Router();

router.get('/healthCheck', (_, res) => {
  return res.sendStatus(200);
});

router.use('/users', user);

export default router;
