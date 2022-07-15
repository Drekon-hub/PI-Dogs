const express = require('express');
const { Router } = require('express');
const { Temperament } = require('../db');
const { getAllDogs } = require('./controller');
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getDog } = require('./controller.js');
const router = Router();

router.get('/temperament', async (req, res) => {
  const allData = await axios.get(URL);
  try {
    let everyTemperament = allData.data
      .map((dog) => (dog.temperament ? dog.temperament : 'No info'))
      .map((dog) => dog?.split(', '));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
      if (el) {
        Temperament.findOrCreate({
          where: { name: el },
        });
      }
    });
    eachTemperament = await Temperament.findAll();
    res.status(200).json(eachTemperament);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/filter', async (req, res) => {
  const temperament = req.query.temperament;
  const everyDog = await getAllDogs();
  const dogSearchResult = everyDog.filter((dog) => {
    if (temperament === 'all') return everyDog;
    else if (dog.temperaments) {
      if (typeof dog.temperament === 'object') {
        let temp = dog.temperaments.map((temp) => {
          return temp.name;
        });
        // console.log(
        //   temp.toString().toLowerCase().includes(temperament.toLowerCase())
        // );
        return temp
          .toString()
          .toLowerCase()
          .includes(temperament.toLowerCase());
      }
      // console.log(dog.temperaments);
      return dog.temperaments.toLowerCase().includes(temperament.toLowerCase());
    }
  });
  res.status(200).json(dogSearchResult);
});
module.exports = router;
