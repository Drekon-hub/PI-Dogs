const express = require('express');
const { Router } = require('express');
const { Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getDog } = require('./controller.js');
const router = Router();

router.get('/temperament', async (req, res) => {
    const allData = await axios.get(URL);
    try {
      let everyTemperament = allData.data
        .map((dog) => (dog.temperament ? dog.temperament : "No info"))
        .map((dog) => dog?.split(", "));
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
module.exports = router;