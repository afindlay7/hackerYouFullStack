const jwt = require('jsonwebtoken');
const config = require('./config.json');

// a service to create a new token
// it accepts a user, and sends back a signed token

const create = (user) => {
    // grab the id off of the user
    const { _id } = user;

    // describe what we want our token to look like
    const payload = {
        user: {
            id: _id
        }
    };
    
    // sign and send back the token, passing in a secret
    return jwt.sign(payload, config.secret);
}

module.exports = { create };