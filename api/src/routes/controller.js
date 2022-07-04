const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const getDog = async () => {
  const dogsApi = await axios.get(URL);
  const dogs = dogsApi.data;

  const dogsMaps = dogs.map((d) => {
    return {
      id: d.id,
      name: d.name,
      image: d.image.url,
      life_span: d.life_span,
      temperament: d.temperament,
      weight_min: parseInt(d.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(d.weight.metric.slice(4).trim()),
      height_min: parseInt(d.height.metric.slice(0, 2).trim()),
      height_max: parseInt(d.height.metric.slice(4).trim()),
    };
  });
  return dogsMaps;
};

module.exports = { getDog };
