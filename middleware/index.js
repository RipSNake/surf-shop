module.exports = {
	errorHandler: (fn) => {
		(req, res, next) => {
			Promise.resolve(fn(req, res, next)) // If successfull redirects to index page (controllers/index.js)
					.catch(next); // If failure redirects to error message
		}
	}
}