const express = require('express');
const router = express.Router();
const controller = require('../controller');
const verify = require('../middleware/VerifyToken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hallo world ExpressJS');
});


router.get('/all', verify,controller.getUsers);
router.post('/register', verify,controller.register);
router.put('/update/:id', verify,controller.updateUser);
router.delete('/delUser/:id', verify,controller.deleteUser);
router.post('/login', controller.login);

module.exports = router;
