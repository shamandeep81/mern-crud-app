const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();

const app = express();


connectDB();


app.use(express.json());
app.use(cors({ origin: 'https://mern-crud-app-95wx.vercel.app' }));


app.use('/api/customers', customerRoutes);
app.use('/api/memberships', membershipRoutes);


module.exports = app; // ✅ Export app instead of using app.listen()
module.exports.handler = serverless(app);
