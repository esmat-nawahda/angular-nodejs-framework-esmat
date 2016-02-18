var userServer = require('../Ops/userServer');

// bigen deal with route (http request)
// request response to deal with routes and requests 
module.exports = function(app, express) {


	var api = express.Router();

// dest A
// create user
// one http request
    api.post('/register', function(req, res){
        userServer('register',req, res);
    });

    //Login
    api.post('/login', function(req, res){
        userServer('login',req, res);
    });

// get all user
	api.get('/users', function(req, res) {

		User.find({}, function(err, users) {
			if(err) {
				// res :send for client there is error 
				// it contain function can get json obj and post it 
				res.send(err);
				return;
			}

			res.json(users);
		});
	});


	api.post('/login', function(req, res) {
       // find specific obj
		User.findOne({
		username: req.body.username
		 }).select('name username password').exec(function(err, user) {

		 	if(err) throw err;

		 	if(!user) {

		 		res.send({ message: "User doesn't exist"});
		 	} else if(user){

		 		var validPassword = user.comparePassword(req.body.password);

		 		if(!validPassword) {
		 			res.send({ message: "Invalid Password"});
		 		} else {

		 		//when suucces (means user successful login to the website)
		 		// can recall all your information in token
		 		// after this we need jsonwebtoken
		 		var token = createToken(user);


		 		res.json({
		 			success: true,
		 			message: "Successfuly login!",
		 			token: token
		 		});

		 		}
		 	}
		 });
	});


	api.use(function(req, res, next) {


		console.log("Somebody just came to our app!");

		var token = req.body.token || req.param("token") || req.headers['x-access-token'];

		// check if token exist

		if(token) {

			jsonwebtoken.verify(token, secretKey, function(err, decoded) {

				if(err) {
					res.status(403).send({ success: false, message: "Failed to authenticate user"});
                 } else {

                 	//
                 	req.decoded = decoded;

                 	next();
                 }
			});
          } else {

          	res.status(403).send({ success:false, message: "No Token Provided"});

          }
	}); 



	// Dest B // provide a legitimate token

	/*api.get('/', function(req, res) {

		res.json("Hello World!");
	});
	return api*/


	// multiple htp request in single route

	api.route('/')
	// post : to store story

	.post(function(req, res) {

		var story = new Story({
			creator: req.decoded.id,
			content: req.body.content,
		});

		story.save(function(err) {
			if(err) {
				res.send(err);
				return
			}
			res.json({message: "New Story Created"});
		});
	})





       .get(function(req, res) {

		Story.find({ creator: req.decoded.id }, function(err, stories) {
	     
	     if(err) {
	       res.send(err);
	       return;
	     }

	     res.json(stories);
		});
	});

       
// this is the way for us to get the user_id , name, username
 api.get('/me',function(req, res) {
	res.json(req.decoded);
});



	return api

}