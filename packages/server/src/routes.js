const express = require('express');

const Controller = require('./controller');

const router = express.Router();

router.post('/result', Controller.createResult);
router.get('/result/:id', Controller.getResultById);
router.get('/results', Controller.getResults);

module.exports = router;
