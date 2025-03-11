const express = require('express');
const router = express.Router();
const { getMemberships } = require('../controllers/membershipController');

router.get('/', getMemberships);

module.exports = router;
