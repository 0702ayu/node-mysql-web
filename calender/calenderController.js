const calendarService = require('./calendarService');

exports.getEvents = async (req, res) => {
    try {
        const events = await calendarService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};

exports.addEvent = async (req, res) => {
    try {
        const newEvent = await calendarService.createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error adding event', error });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await calendarService.deleteEvent(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};