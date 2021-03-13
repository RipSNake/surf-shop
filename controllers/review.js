const Post = require('..models/post');
const Review = require('../models/review');

module.exports = {
	// Create Review
	async reviewCreate(req, res, next) {
		// find the post by its id
		let post = await Post.findById(req.params.id);
		// create the review
		req.body.review.author = req.user._id;
		let review = await Review.create(req.body.review);
		// assign review to post
		post.reiews.push(review);
		// save the post
		post.save();
		// redirect to the post
		req.session.success = 'Review Created Successfully!';
		res.redirect(`/posts/${post.id}`);
	},
	// Update Review
	async reviewUpdate(req, res, next) {

	},
	// Destroy Review
	async reviewDestroy(req, res, next) {

	}
}