// server sent event router
import { Router } from 'express';
import sseController from '../controllers/sseController';

const router = Router();

router.get('/', sseController.sendServerSendEvent);

export default router;
