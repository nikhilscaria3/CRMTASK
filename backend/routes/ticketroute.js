const express = require('express');
const { createComplaint, getComplaints, replyComplaint, repliesData } = require('../controller/TicketController');
const { route } = require('./users');
const { countdata } = require('../controller/HomepageController');
const router = express.Router();

//Ticket Route
router.post('/api/complaint', createComplaint)
router.get('/api/complaint', getComplaints)
router.post('/api/reply', replyComplaint)
router.get('/api/replies', repliesData)


//Homepage Routees
router.get('/api/count', countdata)



module.exports = router;
