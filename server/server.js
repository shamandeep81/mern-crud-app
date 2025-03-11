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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
