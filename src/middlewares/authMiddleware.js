const jwt = require('jsonwebtoken');
let jwtSecret = '%$#%&%$#%&*^(^%&)(_)*';

function authMiddleware(req, res, next) {
    const tokenAuth = req.headers['authorization'];
    if(tokenAuth) {
        const token = tokenAuth.split(' ')[1];

        jwt.verify(token,jwtSecret, (error, decoded) => {
            if(error) {
                res.status(400).json({error: 'Erro ao receber token'})
            } else {
             req.token = token;
             req.loggedUser = {
                id: decoded.id, 
                name: decoded.name, 
                email: decoded.email, 
                phoneNumber: decoded.phoneNumber
            } 
            next()
            }
        })
    }else {
        res.status(401).json({error: 'Nao autorizado'});
    }
   
}

module.exports = authMiddleware;