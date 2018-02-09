// app/models/games.js
// grab the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbURI = process.env.MONGO_URL; 

var promise = mongoose.connect(dbURI, {
  useMongoClient: true,
  /* other options */
});

mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
});

mongoose.connection.on('error', err => {
        console.log('Mongoose connection error:', err);
});

const readLine = require ('readline');
if (process.platform === 'win32'){
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit ("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});



// define our games model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Game', {
    Name : {type : String, default: ''},
    Rating: {
	type: Number,
	'default': 0,
	min: 0,
	max: 10
    },
    Description: String,
    Image: String,
    Type: [String],
    Mechanisms: [String],
    Category: [String],
    "Playing Time":String,
    Ages: String,
    Players: String
});
