const jwt = require('jsonwebtoken');
const router = require('./auth');

module.exports = function(req, res, next) {
    console.log('verify function started');
    const token = req.header('auth-token');
    console.log(token);
    if(!token) {
        return res.status(401).json({ // <-- here you need to `return`
            message: 'Access denied!'
        });
    };
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        return res.status(400).json({
            message: 'Invalid token!'
        });
    };
};

module.exports = router;