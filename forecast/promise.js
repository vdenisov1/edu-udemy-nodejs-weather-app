const axios = require('axios');
const REQUEST_URL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}`;

let getForecast = (latitude, longitude) => {
    const requestUrl = `${REQUEST_URL}/${latitude},${longitude}`;

    return new Promise((resolve, reject) => {
        axios.get(requestUrl).then((response) => {
            const result = response.data;
            const forecast = {
                currentTemp: result.currently.temperature,
                apparentTemperature: result.currently.apparentTemperature
            };
            resolve(forecast);
        }).catch((e) => {
            if (e.code === 'ENOTFOUND') {
                reject('Unable to connect to Google server');
            } else {
                reject(e.message);
            }
        })
    });

};

module.exports.getForecast = getForecast;