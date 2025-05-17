const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const review = require("../models/review.js");

// Middleware to validate review data

const reviewController = require("../controllers/reviews.js");

// POST route – Add a new review to a listing
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

// DELETE route – Remove a review from a listing
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;