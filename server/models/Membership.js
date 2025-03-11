const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
}, 
  description: { 
    type: String 
},
}, { collection: 'tbl_Memberships' });

module.exports = mongoose.model('Membership', MembershipSchema);
