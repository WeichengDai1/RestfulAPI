// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

// Heroku Mongoose connection
mongoose.connect('mongodb+srv://admin:453688@restfulapi.lixxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

var str1 = 'You can use https://desolate-bayou-82803.herokuapp.com/api/users and POST method to add users.'+
' <br/> Remember to include all four attributes, firstname, lastname, email and address.'+
' <br/> <br/> <br/> You can use https://desolate-bayou-82803.herokuapp.com/api/users/{id} and GET method to show a certain user. '+
' <br/> <br/> <br/> If you want to see all the users, use https://desolate-bayou-82803.herokuapp.com/api/users and GET method.' +
' <br/> <br/> <br/> You can use https://desolate-bayou-82803.herokuapp.com/api/users/{id} and DELETE method to delete a certain user.'+
' <br/> <br/> <br/> You can use https://desolate-bayou-82803.herokuapp.com/api/users/{id} and PUT method to update a certain user.' +
' <br/> You can add one or more attributes of these four: firstname, lastname, email and address.' +
' <br/> <br/> <br/> You can search for users using https://desolate-bayou-82803.herokuapp.com/api/find?lastname=Dai and GET method to find a certain user.';
while (str1.indexOf("\\n") >= 0) { var str2 = str1.replace("\\n", " \n "); } 
// Send message for default URL
app.get('/', (req, res) => res.send(str1));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});