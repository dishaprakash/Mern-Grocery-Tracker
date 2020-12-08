const router = require('express').Router();
let Grocery = require('../models/grocery.model');

router.route('/').get((req, res) => {
  Grocery.find()
    .then(groceries => res.json(groceries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);

  const newGrocery = new Grocery({
    username,
    description,
    quantity,
  });

  newGrocery.save()
  .then(() => res.json('Grocery added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Grocery.findById(req.params.id)
    .then(groceries => res.json(groceries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Grocery.findByIdAndDelete(req.params.id)
    .then(() => res.json('Grocery deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Grocery.findById(req.params.id)
    .then(groceries => {
        groceries.username = req.body.username;
        groceries.description = req.body.description;
        groceries.quantity = Number(req.body.quantity);

        groceries.save()
        .then(() => res.json('Grocery updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;