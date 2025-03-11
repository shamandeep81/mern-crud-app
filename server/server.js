const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


connectDB();


app.use(express.json());
app.use(cors());


app.use('/api/customers', customerRoutes);
app.use('/api/memberships', membershipRoutes);


module.exports = app; // ✅ Export app instead of using app.listen()
app.listen()
module.exports.handler = serverless(app);
