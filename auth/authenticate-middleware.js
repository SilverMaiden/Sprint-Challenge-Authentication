/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = "Much secret yes";

    if (token) {
        jwt.verify(token, secret, (err, token) => {
            if (error) {
                res.status(401).json({ you: 'shall not pass!' });
            } else {
                req.token = token;
                next();
            }
        });
    } else {
        res.status(401).json({message: 'Please try to login again.'})
    }
};
