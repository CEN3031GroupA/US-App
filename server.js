// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://ushackathon:ushackathon1234@ds019960.mlab.com:19960/ushackathon-db', function(err) {
    if (err) {
        console.log('ERROR connecting to database');
    } else {
        console.log('Successfully connected to database');
    }
});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Song = mongoose.model('Song', {
    title: String,
    id: Number
});

// Routes

    // Get reviews
    app.get('/api/songs', function(req, res) {

        console.log("fetching songs");

        // use mongoose to get all reviews in the database
        Song.find(function(err, reviews) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(songs); // return all reviews in JSON format
        });
    });

    // create review and send back all reviews after creation
    app.post('/api/songs', function(req, res) {

        console.log("creating song");

        // create a review, information comes from request from Ionic
        Song.create({
            title : req.body.title
        }, function(err, song) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            Review.find(function(err, song) {
                if (err)
                    res.send(err)
                res.json(songs);
            });
        });

    });

    // delete a review
    app.delete('/api/songs/:song_id', function(req, res) {
        Review.remove({
            _id : req.params.song_id
        }, function(err, song) {

        });
    });


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
