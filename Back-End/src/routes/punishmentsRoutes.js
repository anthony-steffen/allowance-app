const express = require('express');

const { getAllPunishments, includePunishmentToggle } = require('../controllers/punishmentController');

const router = express.Router();

router.get('/', getAllPunishments);
router.patch('/:id/toggle', includePunishmentToggle);

module.exports = router;