const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    if(!req.headers.authorization)
        return res.status(401).send('Unauthorized 1');

    let token = req.headers.authorization.split(" ")[1];

    if(token == null)
        return res.status(401).send('Unauthorized 2');
    
    jwt.verify(token, 'mysecretkey', (err, token) => {
        if(err)
            return res.status(401).send('Unauthorized 3');
        else{
            req.userId = token._id;
            next();
        }
    })
    
}