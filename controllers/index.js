const User = require('../models/user');
const passport = require('passport');

module.exports = {
	// POST /register
	async postRegister(req, res, next) {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			image: req.body.image
		});

		await User.register(newUser, req.body.password);
		res.redirect('/'); // Redirects to home page (index page)

	},

	// POST /login
	async postLogin(req, res, next) {
		await passport.authenticate('local', {
			successRedirec: '/', // Login succesfull
			failureRedirect: '/login' // Failed login
		})(req, res, next); // Added in order to make passport.authentica have access to the parameters and get invoked correctly
	},
	// GET /logout
	getLogout(req, res, next) {
		req.logout(); // end session
		res.redirect('/'); // redirects to home page
	}
}