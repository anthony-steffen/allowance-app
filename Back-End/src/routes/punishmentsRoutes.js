const express = require('express');

const { getAllPunishments } = require('../controllers/punishmentController');

const router = express.Router();

router.get('/', getAllPunishments);

module.exports = router;