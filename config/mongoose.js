//require the library
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactList');

//acquire the connection (to check if it is successfull)
var db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'connection error:'));


//up and running then print the message
db.once('open', function() {
    console.log('Successfully connecte to the databse');
});

