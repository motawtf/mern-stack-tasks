const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:admin@mern-tasks-plqty.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;