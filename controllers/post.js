const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'ripsnake',
	api_key: '927767136794841',
	api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
	// SEE ALL POSTS views/post/index
	async postIndex(req, res, next) {
		let posts = await Post.find({});
		res.render('../views/posts/index', { posts });
	},
	// Write NEW POST /views/posts/new
	postNew(req, res,next) {
		res.render('../views/posts/new');
	},
	// CREATE POST and redirect to newly created post
	async postCreate(req, res, next) {
		// Set the images body attribute as an empty array
		req.body.post.images = []; 
		// handle max image limit

		// Upload images to cloudinary
		for(const file of req.files){
			let image = await cloudinary.v2.uploader.upload(file.path);
			// Add clodinary image data to images array
			req.body.post.images.push({
				url: image.secure_url,
				public_id: image.public_id
			});
		}
		// Create post in the database and redirect to show view
		let post = await Post.create(req.body.post);
		res.redirect(`/posts/${post.id}`);	
	},
	// SHOW POST
	async postShow(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('../views/posts/show', { post });
	},
	// EDIT POST
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('../views/posts/edit', { post });
	},
	// UPDATE POST
	async postUpdate(req, res, next) {
		// handle deletation of images

		// update images and handle max quantity

		// update in database and redirect
	},
	// DELETE POST
	async postDelete(req, res, next) {
		await Post.findByIdAndDelete(req.params.id);
		res.redirect('/posts');
	}
}