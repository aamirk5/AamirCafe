const router = require('express').Router();
let Branch = require('../models/branch.model');

router.route('/').get((req, res) => {
  Branch.find()
    .then(branches => res.json(branches))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newBranch = new Branch(req.body);

  newBranch.save()
    .then(() => res.json('Branch added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
