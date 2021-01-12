const express = require('express');
const router = express.Router({ mergeParams: true });

/*
	As the form for creating a new review and the show page for one simple reviews 
	will be in the posts page, we don't need to specify a route for them.
*/

/* GET all the reviews /posts/:id/reviews */
router.get('/', (req, res, next) => { // INDEX
	res.send('GET reviews from  /posts/:id/reviews');
});

/* GET reviews new /posts/:id/reviews/new */ // Form for creating a new review
// router.get('/new', (req, res, next) => { // CREATE
//	res.send('GET new review -- /posts/:id/reviews/new')
// }); 

// /* POST create new review /posts/:id/reviews */
router.post('/', (req, res, next) => { // NEW
	res.send('POST CREATE new review /posts/:id/reviews');
 });

/* GET show one review /posts/:id/reviews/review_id */ // Show one specific review
// router.get('/review_id', (req, res, next) => { // SEE_REVIEW
//	res.send('GET one specific review /posts/:id/reviews/review_id');
// }); 

/* GET edit review /posts/:id/reviews/review_id/edit */
router.get('/review_id/edit', (req, res, next) => { // EDIT
	res.send('GET EDIT one review /posts/:id/reviews/review_id/edit');
}); 

/* PUT update review /posts/:id/reviews/review_id */
router.put('/review_id', (req, res, next) => { // update
	res.send('PUT UPDATE review /posts/:id/reviews/review_id');
}); 

/* DELETE destroy review /posts/:id/reviews/review_id */
router.delete('/review_id', (req, res, next) => { // DELETE
	res.send('DELETE destroy review /posts/:id/reviews/review_id');
});