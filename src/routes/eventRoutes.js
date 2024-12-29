const express = require('express');
const {authenticate,authorizeOrganizer} = require('../middleware/authMiddleware');
const {createEvent,getEvents,updateEvent,deleteEvent, registerForEvent} = require("../controllers/eventController");

const router = express.Router();


router.get('/',authenticate,getEvents);
router.post('/',authenticate,authorizeOrganizer,createEvent);
router.put('/:id',authenticate,authorizeOrganizer,updateEvent);
router.delete('/:id',authenticate,authorizeOrganizer,deleteEvent);
router.post('/:id/register',authenticate,registerForEvent);

module.exports = router;
