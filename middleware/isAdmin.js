export default function (req, res, next) {
  if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin only' });
  next();
}