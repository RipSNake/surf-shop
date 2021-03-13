const Post = require('../models/post');
const mbxGeocoding = require('@mampbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({acessToken: process.env.MAPBOX_TOKEN});
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
		let response = await geocodingClient
			.forwardGeocode({
				query: req.body.post.location,
				limit: 1
			})
			.send();
			req.body.post.coordinates = response.body.features[0].geometry.coordinates;
		// Create post in the database and redirect to show view
		let post = await Post.create(req.body.post);
		res.session.success = 'Post created successfully';
		res.redirect(`/posts/${post.id}`);	
	},
	// SHOW POST
	async postShow(req, res, next) {
		let post = await Post.findById(req.params.id).populate({
			path: 'reviews',
			options: { sort: { '_id': -1 } }
		});
		res.render('../views/posts/show', { post });
	},
	// EDIT POST
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('../views/posts/edit', { post });
	},
	// UPDATE POST
	async postUpdate(req, res, next) {
		// find the post by id
		let post = await Post.findById(req.params.id);
		// check if there's any images for deletion
		if(req.body.deleteImages && req.body.deleteImages.length) {
			// assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			// loop over deleteImages
			for(const public_id of deleteImages) {
				// delete image from cloudinary
				await cloudinary.v2.uploader.destroy(publicid);
				// delete image from post.imagesfor(const image of post.images) {
				for(const image of post.images) {
					if(image.public_id === public_id) {
						let index = post.images.indexOf(image);
						post.images.splice(index,1);
					}
				}
			}
		}
		// check if there are any new images for upload
		if(req.files) {
			// upload images
			for( const file of req.files) {
				let image = await cloudinary.v2.uploader.upload(file.path);
				// Add clodinary image data to images array
				req.body.post.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}
		// check if location was updated
		if(req.body.post.location !== post.location) {
			let response = await geocodingClient
			.forwardGeocode({
				query: req.body.post.location,
				limit: 1
			})
			.send();
			post.coordinates = response.body.features[0].geometry.coordinates;
			post.location = req.body.post.location;
		}
		// update the post with any new properties
		post.title = req.body.post.title;
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		// save the updated post into the db
		post.save();
		// redirect to show page
		res.redirect(`/posts/${post.id}`);
	},
	// DELETE POST
	async postDelete(req, res, next) {
		await Post.findByIdAndDelete(req.params.id);
		res.redirect('/posts');
	}
}