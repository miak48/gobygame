const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(e => {
        console.error(`Connection error: ${process.env.MONGODB_URI}`, e.message)
    });

const db = mongoose.connection;

module.exports = db;
