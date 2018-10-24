var mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost/e_home',{ useNewUrlParser: true });

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("connect success!")
});

module.exports = connection