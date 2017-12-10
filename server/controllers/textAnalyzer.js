const { textAnalyzer } = require('../db/models').textAnalyzer;
const { Users } = require('../db/models').Users;

module.exports = {
  create(req, res) {
    return textAnalyzer
      .create({
        title: req.body.title,
      })
      .then(analysis => res.status(201).send(analysis))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return textAnalyzer
      .findall({
        include: [{
          model: Users,
          as: 'users',
        }],
      })
      .then(analysis => res.status(200).send(analysis))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return textAnalyzer
      .findById(req.params.userId, {
        include: [{
          model: Users,
          as: 'users',
        }],
      })
      .then((analysis) => {
        if (!analysis) {
          return res.status(404).send({
            message: 'analysis Not Found',
          });
        }
        return res.status(200).send(analysis);
      })
      .catch(err => res.status(400).send(err));
  },
  update(req, res) {
    return textAnalyzer
      .findById(req.params.userId, {
        include: [{
          model: Users,
          as: 'users',
        }],
      })
      .then((analysis) => {
        if (!analysis) {
          return res.status(404).send({
            message: 'analysis Not Found',
          });
        }
        return analysis
          .update({
            title: req.body.title || analysis.title,
          })
          .then(() => res.status(200).send(analysis))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
  destroy(req, res) {
    return textAnalyzer
      .findById(req.params.userId)
      .then((analysis) => {
        if (!analysis) {
          return res.status(400).send({
            message: 'analysis not found',
          });
        }
        return analysis
          .destroy()
          .then(() => res.status(200).send({ message: 'analysis deleted' })
            .catch(err => res.status(400).send(err)))
          .catch(err => res.status(400).send(err));
      });
  },
};
