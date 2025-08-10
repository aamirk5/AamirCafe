const router = require('express').Router();
let Promotion = require('../models/promotion.model');

router.route('/').get((req, res) => {
  Promotion.find()
    .then(promotions => res.json(promotions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newPromotion = new Promotion(req.body);

  newPromotion.save()
    .then(() => res.json('Promotion added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
