const express = require('express');
const request = require('request-promise');

const router = express.Router();

router.get('/ping', (req, res) => {
  return res.send('pong');
});

router.get('/find', async (req, res) => {
  const { lat, lng } = req.query;

  const zkey = '913474aaa542c3ae506a7e2fa4746e35';

  const options = {
    hostname: '',
    url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
    method: 'GET',
    headers: { 'user-key': zkey, 'Content-Type': 'application/json' },
  };

  console.log(lat, lng);

  try {
    const data = await request(options);
    const nearby = JSON.parse(data).nearby_restaurants;
    return res.status(200).json({ message: nearby });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'unable to get list of restaurants' });
  }
});

module.exports = router;
