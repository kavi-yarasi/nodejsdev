const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://lkaviyarasik4_db_user:14jiS1GZCEgOAAyd@kaviscluster.uf2jwci.mongodb.net/?appName=kaviscluster");
}

module.exports = connectDB; // always we need to listen to the server only after the db connection is done