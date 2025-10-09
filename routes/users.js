const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hallo world ExpressJS');
});

router.get('/all', controller.getUsers);

module.exports = router;
