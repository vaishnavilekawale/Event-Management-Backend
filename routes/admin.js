import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import { approveEvent, listPending, listAll } from '../controllers/adminController.js';

const router = express.Router();
router.use(auth, isAdmin);

router.get('/pending', listPending);
router.get('/all', listAll);
router.post('/approve/:id', approveEvent);

export default router;