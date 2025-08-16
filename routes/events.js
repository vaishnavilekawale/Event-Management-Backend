import express from 'express';
import auth from '../middleware/auth.js';
import { createEvent, updateEvent, deleteEvent, listEvents, getEvent, registerForEvent, cancelRegistration, myRegistrations } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', listEvents); // filter by date/location via query
router.get('/:id', getEvent);
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

// registrations
router.post('/:id/register', auth, registerForEvent);
router.post('/:id/cancel', auth, cancelRegistration);
router.get('/registrations/me', auth, myRegistrations);

export default router;