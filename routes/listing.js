const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing, isReviewAuthor } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudCounfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingcontroller.index))

    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingcontroller.createListing)
    );

// New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);


router
    .route("/:id")
    .get(
        wrapAsync(listingcontroller.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingcontroller.renderupdateForm)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingcontroller.destroyListing)
    )





// Edit Form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingcontroller.renderEditForm)
);







module.exports = router;