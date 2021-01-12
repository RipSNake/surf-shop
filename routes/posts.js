const express = require('express');
const router = express.Router();

/* GET posts index /posts */
router.get('/', (req, res, next) => {
	res.send('GET /posts');
});

/* GET posts new /posts/new */
router.get('/new', (req, res, next) => {
	res.send('GET /posts/new');
});

/* POST posts create /posts */
router.post('/', (req, res, next) => {
	res.send('Create new post: POST /post');
});

/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
	res.send('SHOW post GET /posts/:id');
});

/* GET posts edit /posts/:id/edit */
router.get(':id/edit', (req, res, next) => {
	res.send('Editing one post GET /posts/:id/edit');
});

/* PUT posts update /posts/:id */
router.put('/:id', (req, res, next) => {
	res.send('Updating post PUT posts/:id');
});

/* DELETE posts destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
	res.send('Deleting DELETE posts/:id');
})

module.exports = router;

/*

GET index		/posts
GET new			/posts/new
POST create 	/posts
GET show		/posts/:id
GET edit		/posts/:id/edit
PUT update		/posts/:id
DELETE destroy	/posts/:id

*/