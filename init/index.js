const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { object } = require("joi");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, Owner: '68087db472c51dfe11c8f925' }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

main()
    .then(initDB)
    .catch((err) => {
        console.error("Error:", err);
    });