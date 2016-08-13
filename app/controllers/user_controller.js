import jwt from 'jwt-simple';
import User from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  res.send({ token: tokenForUser(req.user) });
  return undefined;
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide your name, email and password');
  }

  // check if user already exists with email
  User.findOne({ email }).then(response => {
    if (response != null) {
      res.status(433).send('user already registered with that email');
      return;
    }
  });

  const user = new User();
  user.email = email;
  user.password = password;
  user.username = username;
  user.save()
  .then(result => {
    res.send({ token: tokenForUser(user) }); // return user token
  })
  .catch(err => {
    res.json(err);
  });
  return undefined;
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.secret);
}
