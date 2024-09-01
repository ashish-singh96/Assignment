import express from 'express';
import UserController from './controllers/UserController.js'
import TicketController from './controllers/TicketController.js';
import EventController from './controllers/EventController.js';


const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.post('/event', EventController.insert_Event);
router.get('/get_Events/:id', EventController.getEventDetails);
router.post('/bookTickets', TicketController.bookTickets);

export default router;