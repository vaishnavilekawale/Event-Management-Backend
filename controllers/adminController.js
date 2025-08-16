import Event from '../models/Event.js';

export const listPending = async (req, res) => {
  try {
    const events = await Event.find({ approved: false }).populate('createdBy', 'name email');
    res.json(events);
  } catch (err) { console.error(err); res.status(500).json({ msg: 'Server error' }); }
};

export const listAll = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.json(events);
  } catch (err) { console.error(err); res.status(500).json({ msg: 'Server error' }); }
};

export const approveEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    ev.approved = true;
    await ev.save();
    res.json(ev);
  } catch (err) { console.error(err); res.status(500).json({ msg: 'Server error' }); }
};