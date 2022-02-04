const mongoose = require("mongoose");
const config = require('config');
const db = config.get('mongoURLAtlas');

mongoose.Promise = global.Promise;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log('MongoDB Connected.')
    } catch (e) {
        console.error("amanan"+e.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;