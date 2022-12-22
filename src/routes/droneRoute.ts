import { Router } from 'express';
import droneController from '../controllers/droneController';

const router = Router();

router.get('/', droneController.getDrones);

export default router;
