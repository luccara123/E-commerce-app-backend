const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] // associated products
    }
  }).then(dbCategory => {
    if (!dbCategory) {
       // if page not found
        res.status(404).json({ message: 'Unable to find categories' });
        return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    // if there's an error with the server
    console.log(err);
    res.status(500).json(err)
  })
});

// Find one category by its ID
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
        id: req.params.id
    },
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
   }).then(dbCategory => {
    if (!dbCategory) {
      // if page not found
        res.status(404).json({ message: 'Unable to find the category' });
        return;
    }
    res.json(dbCategory);
   })
   .catch(err => {
    console.log(err);
    // if there's an error with the server
    res.status(500).json(err)
   })
});

// Post request
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategory => res.json(dbCategory))
   .catch(err => {
    console.log(err);
     // if there's an error with the server
    res.status(500).json(err);
  })
});

// Update category
router.put('/:id', (req, res) => {
  Category.update(req.body, {  // will update the body when the id is found
    where: {
        id: req.params.id
    }
  })
  .then(dbCategory => {
    if (!dbCategory[0]) {
       // if page not found
        res.status(404).json({ message: 'Unable to find a category with this id' });
        return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
     // if there's an error with the server
    res.status(500).json(err);
  })
});

//Delete a category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
        id: req.params.id
    }
   }).then(dbCategory => {
    if (!dbCategory[0]) {
       // if page not found
        res.status(404).json({ message: 'Unable to find a category with this id' });
        return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
     // if there's an error with the server
    res.status(500).json(err);
  })
});

module.exports = router;
