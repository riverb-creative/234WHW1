const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
    //the request object contains a headers collection - 
    //the JWT will be in the authorization property
    const authHeader = request.headers.authorization;

    //reject any request that does not contain a value for authorization
    //the 401 HTTP status code means that the request has not been completed
    //because it lacks valid authentication credentials
    if(!authHeader) {
        return response.sendStatus(401)
    }

    //we also need to check that if there is an authorization value, it is the correct one
    //1. extract the payload portion of the JWT
    const token = authHeader.split(" ")[1];

    //2. Use the jwt library to compare submitted data against our JWT secret in the .env file
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        //reject unmatching tokens with a "forbidden" HTTP status code
        if(error) {
            return response.sendStatus(403);
        }

        //otherwise, set the user property of the request object and pass along to
        //the rest of the route handling function
        request.user = user;
        next();
    });
}

module.exports = authenticate;