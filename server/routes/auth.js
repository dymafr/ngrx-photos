const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');

function createToken(user) {
  return jwt.sign({}, RSA_KEY_PRIVATE, {
    algorithm: 'RS256',
    expiresIn: '15s',
    subject: user._id.toString()
  })
}


router.get('/refresh-token',(req , res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
      if (err) {
        console.log('err : ', err);
        res.status(401).json('tooooooken expire');
      } else {
        User.findOne({ '_id': decoded.sub }).exec( (err , user) => {
          const newToken = createToken(user);
          res.json(newToken);
        })
      }
    })
  } else {
    res.status(401).json('no token');
  }
})

router.post('/signin', (req, res) => {
  User.findOne({ 'email': req.body.email }).exec( (err, user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = createToken(user);
      res.status(200).json(token);
    } else {
      res.status(401).json('signin fail !');
    }
  })
})

router.post('/signup', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
  })

  newUser.save( (err) => {
    if (err) { res.status(500).json('erreur signup') }  
    res.status(200).json('signup ok !');
  })

})



module.exports = router;