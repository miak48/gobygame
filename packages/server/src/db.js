const mongoose = require('mongoose');

mongoose
    .connect('mongodb://db:27017/gobygame', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
