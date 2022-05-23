const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'] // associated products
    }
  }).then(dbTag => {
    if (!dbTag) {
       // if page not found
        res.status(404).json({ message: 'Unable to find the tags' });
        return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    // if there's an error with the server
    console.log(err);
    res.status(500).json(err)
  })
});

// Find the tag by its ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
        id: req.params.id
    },
    include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
    }
   }).then(dbTag => {
    if (!dbTag) {
      // if page not found
        res.status(404).json({ message: 'Unable to find the tag name' });
        return;
    }
    res.json(dbTag);
   })
   .catch(err => {
    console.log(err);
    // if there's an error with the server
    res.status(500).json(err)
   })
});

//Post request
router.post('/', (req, res) => {
  Tag.create({
          tag_name: req.body.tag_name
      })
      .then(dbTag => res.json(dbTag))
      .catch(err => {
          console.log(err);
          // if there's an error with the server
          res.status(500).json(err);
      })
});


// Update request
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
          where: {
              id: req.params.id
          }
  }).then(dbTag => {
      if (!dbTag) {
         // if page not found
          res.status(404).json({ message: 'Unable to find the tag name' });
           return;
      }
      res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    // if there's an error with the server
    res.status(500).json(err);
  })
});

// Delete request
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbTag => {
    if (!dbTag) {
      // if page not found
        res.status(404).json({ message: 'Unable to find the tag name' });
        return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    // if there's an error with the server
    res.status(500).json(err);
  })
});

module.exports = router;
