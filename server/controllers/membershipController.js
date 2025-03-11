const Membership = require('../models/Membership');


exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
