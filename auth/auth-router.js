const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/user-model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
    const user = req.body;
    const hashPassword = bcrypt.hashSync(user.password, 8);

    user.password = hashPassword;

    if (user.username && user.password) {
        Users.addUser(user)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json({message: "There was a problem adding the user. Please try again later."})
        })
    } else {
        res.status(400).json({message: 'Please enter a valid username and password.'})
    }
});

router.post('/login', (req, res) => {
  // implement login
    const {username, password} = req.body;

    if (username && password) {
        Users.findBy(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = assignToken(user);
                res.status(200).json({message: `Successful login. Welcome, ${username}.`, token});
            } else {
                res.status(401).json({message: "Invalid credentials. Please try again."})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'There was a problem logging in. Please try again later.'});
        })
    } else {
        res.status(400).json({message: 'Please enter your username and password.'});
    }
});


function assignToken(user) {
    const payload = {
        subject: user.id,
    };

    const options = {
        expiresIn: '1hr',
    };

    return jwt.sign(payload, 'Much secret yes', options);
}

module.exports = router;
