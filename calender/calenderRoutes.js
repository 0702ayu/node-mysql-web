const express = require('express');
const router = express.Router();
const calendarController = require('./calendarController');

// Get all calendar events
router.get('/events', calendarController.getAllEvents);

// Add a new calendar event
router.post('/events', calendarController.addEvent);

// Delete a calendar event
router.delete('/events/:id', calendarController.deleteEvent);

module.exports = router;