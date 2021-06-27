const express = require('express');
const router = express.Router();
//Load user model
const User = require('./User');

// To Do: ADD JWT

//@route    GET /users/test
//@desc     Tests users route
//@access Public

router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

//@route    POST /users/register
//@desc     Register users
//@access   Public

// To do: Add hashing to the passwords!!!

router.post('/register', (req, res) => {
	//Reading the body is only thanks requring body-parser
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			// Here, checks if email is not already registerd
			return res.status(400).json('Email already exsist');
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			newUser.save().then((user) => res.send(user.id)).catch((err) => console.log(err));
		}
	});
});

//@route    POST /users/login
//@desc     login users
//@access   Public

// To do: Add hashing to the passwords!!!

router.post('/login', (req, res) => {
	//Check Validatin
	if (!req.body.email || !req.body.password) {
		return res.status(400).json('Missing email or password params');
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json('user not found');
		}
		// Check Passowrd
		if (user.password === password) {
			return res.send(user.id);
		} else {
			return res.status(400).json('Password incorrect');
		}
	});
});

module.exports = router;
