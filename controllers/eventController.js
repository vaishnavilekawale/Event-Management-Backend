import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;
    const ev = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      createdBy: req.user._id,
      approved: req.user.role === 'admin'
    });
    res.status(201).json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    if (!ev.createdBy.equals(req.user._id) && req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Not allowed' });
    Object.assign(ev, req.body);
    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    if (!ev.createdBy.equals(req.user._id) && req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Not allowed' });
    await Registration.deleteMany({ event: ev._id });
    await ev.deleteOne(); // <-- fix: use deleteOne instead of remove
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const listEvents = async (req, res) => {
  try {
    const { date, location, approved } = req.query;
    const filter = {};
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      filter.date = { $gte: d, $lt: next };
    }
    if (location) filter.location = new RegExp(location, 'i');
    if (approved !== undefined) filter.approved = approved === 'true';
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const ev = await Event.findById(eventId);
    if (!ev || !ev.approved)
      return res.status(404).json({ msg: 'Event not found or not approved' });

    // count existing registrations
    const count = await Registration.countDocuments({ event: eventId, status: 'registered' });
    if (ev.capacity && count >= ev.capacity)
      return res.status(400).json({ msg: 'Event full' });

    // prevent duplicate registration
    const existing = await Registration.findOne({ event: eventId, user: req.user._id });
    if (existing && existing.status === 'registered')
      return res.status(400).json({ msg: 'Already registered' });
    if (existing && existing.status === 'cancelled') {
      existing.status = 'registered';
      existing.registeredAt = new Date();
      await existing.save();
      return res.json(existing);
    }

    const reg = await Registration.create({ event: eventId, user: req.user._id });
    res.status(201).json(reg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const reg = await Registration.findOne({ event: eventId, user: req.user._id, status: 'registered' });
    if (!reg) return res.status(404).json({ msg: 'Registration not found' });
    reg.status = 'cancelled';
    await reg.save();
    res.json({ msg: 'Cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const myRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.user._id }).populate('event');
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};