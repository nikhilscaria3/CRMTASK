const express = require('express');
const { createComplaint, getComplaints, replyComplaint } = require('../controller/TicketController');
const { route } = require('./users');
const router = express.Router();

router.post('/api/complaint', createComplaint)
router.get('/api/complaint', getComplaints)
router.post('/api/reply', replyComplaint)


module.exports = router;
