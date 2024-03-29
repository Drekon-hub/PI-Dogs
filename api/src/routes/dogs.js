const { default: axios } = require('axios');
const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');

const router = Router();
const { getAllDogs } = require('./controller.js');

router.get('/dogs', async (req, res) => {
  const { name } = req.query;
  try {
    const result = await getAllDogs();
    // res.json(result);
    if (!name) res.json(result);
    else {
      let dogName = await result.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!dogName) {
        res.sendStatus(404);
      } else {
        res.send(dogName);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/dogs/:idRaza', async (req, res) => {
  try {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    if (!idRaza) {
      res.status(404).json("Couldn't find the name on DBase");
    } else {
      const dog = allDogs.find((dogui) => dogui.id.toString() === idRaza);
      res.status(200).json(dog);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/dogs', async (req, res) => {
  let {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperament,
    image,
  } = req.body;

  if (!image) {
    try {
      image = await (
        await axios.get('https://dog.ceo/api/breeds/image/random')
      ).data.message;
    } catch (error) {
      console.log(error);
    }
  }
  if (
    name &&
    height_min &&
    height_max &&
    weight_min &&
    weight_max &&
    temperament &&
    life_span &&
    image
  ) {
    const createDog = await Dog.create({
      name: name,
      height_min: parseInt(height_min),
      height_max: parseInt(height_max),
      weight_min: parseInt(weight_min),
      weight_max: parseInt(weight_max),
      life_span: life_span,
      temperament: temperament,
      image: image || 'https://dog.ceo/api/breeds/image/random',
    });
    // temperament.map(async (el) => {
    const findTemp = await Temperament.findAll({
      where: { name: temperament },
    });
    createDog.addTemperament(findTemp);
    // });
    res.status(200).send(createDog);
  } else {
    res.status(404).send('Data needed to proceed is missing');
  }
});

module.exports = router;
