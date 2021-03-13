const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../middleware');// searchs for index.js automatically
const {
	reviewCreate,
	reviewUpdate,
	reviewDestroy
} = require('../controllers/reviews');

// /* POST create new review /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT update review /posts/:id/reviews/review_id */
router.put('/review_id', asyncErrorHandler(reviewUpdate)); 

/* DELETE destroy review /posts/:id/reviews/review_id */
router.delete('/review_id', (req, res, next) => { // DELETE
	res.send('DELETE review /posts/:id/reviews/review_id');
});

module.exports = router;