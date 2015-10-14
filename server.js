var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var app = express();
var data = {}; // object instead of array 
var id;
var tokenCount = 0;

// app.use(express.static('public')); // express.static is a type of middleware

app.use(bodyParser.urlencoded({ extended: false})); // using body-parser middleware

// anything happening using handlebars function will pass onto the 'main.handlebar' layout
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

app.get('/main', function (req, res){
	res.render("index"); // pull out the static index.handlebars file 
});

// token receiver test 
app.get('/read', function (req, res){
	res.render("token_receiver"); // pull out the static index.handlebars file 
});

// CREATE a new token - RESTful action
app.post('/tokens', function (req, res) {
	// extract the data from the request using req.body

	// generate a random string as an id
	tokenCount++ ; // update token number 
	id = tokenCount;

	// store the data keyed by the generated id
	data[id] = req.body;

	// redirect to /tokens/:id
	res.redirect('/tokens/'+ id); // redirect back to main browser instead of showing another page
	// console.log(data);
});

// Show the single token - RESTful action -> used for retriving data -> in a string
app.get('/tokens/:id/token_key', function (req, res) {
	token = data[req.params.id];
	// console.log(token);
	tokenString = JSON.stringify(token);
	// rendering show.html template
	res.render('show', {id: id, tokenString: tokenString}); // "show" refers to show.handlebars
});

// when user click submit, the token will be below the form
app.get('/tokens/:id', function (req, res) {	
	token = data[id];
	res.render('edit', {id: id, token: token});
});


// assign local port to serve 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})

