const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Color = require('../../models/Color');
const User = require('../../models/User');

router.post(
  '/',
  [
    auth,
    [
      check('description_Fr', 'Description is required').not().isEmpty(),
      check('description_Ar', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description_Ar, description_Fr, num_Ordre } = req.body;

    //Build type objects
    const colorFields = {};
    colorFields.owner = req.user.id;
    if (description_Ar) colorFields.description_Ar = description_Ar;
    if (description_Fr) colorFields.description_Fr = description_Fr;
    if (num_Ordre) colorFields.num_Ordre = num_Ordre;

    try {
      color = new Color(colorFields);
      await color.save();
      res.json(color);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all profiles Public

router.get('/', async (req, res) => {
  try {
    const colors = await Color.find().populate('owner', ['name']);
    res.json(colors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Delete Type
router.delete('/:color_id', auth, async (req, res) => {
  try {
    //remove type
    await Color.findOneAndRemove({ _id: req.params.color_id });
    res.json({ msg: 'color Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.delete('/', auth, async (req, res) => {
  try {
    //remove type
    await Color.deleteMany({});

    res.json({ msg: 'all Colors are Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
