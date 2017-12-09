const users = require('./../db/models').Users;

module.exports = {
  create(req, res) {
    return users
      .create({
        userName: req.body.userName,
        email: req.body.email,
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  },
}