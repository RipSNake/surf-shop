const express = require('express');
const router = express.Router();
const { postRegister, postLogin, getLogout } = require('../controllers/index'); // Destroctoring pull the value/method from the object exported from controllers/index.js
const { errorHandler } = require('../middleware/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register */
router.get('/register', (req, res, next) => {
	res.send('GET /register');
});

/* POST /register */
router.post('/register', errorHandler(postRegister));

/* GET /login */
router.get('/login', (req, res, next) => {
	res.send('GET /login');
});

/* POST login */
router.post('/login', postLogin);

/* GET logout */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile', (req, res, next) => {
	res.send('GET profile');
});

/* PUT /profile/user_id */
router.put('/profile', (req, res, next) => {
	res.send('PUT /profile/user_id');
});

/* GET forgot password */
router.get('/forgot-pw', (req, res, next) => {
	res.send('GET /forgot-pw');
});

/* PUT forgot password */
router.put('/forgot-pw', (req, res, next) => {
	res.send('PUT forgot-pw');
});

/* GET reset-password/:token */
router.get('/reset/:token', (req, res, next) => {
	res.send('GET /reset/:token');
});

/* PUT reset-password:token */
router.put('/reset/:token', (req, res, next) => {
	res.send('PUT /reset/:token');
});

module.exports = router;
