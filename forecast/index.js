const request = require('request');
const REQUEST_URL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}`;

let getForecast = (latitude, longitude, callback) => {
    const options = {
        url: `${REQUEST_URL}/${latitude},${longitude}`,
        json: true
    };

    request(options, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback({ 
                currentTemp: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }, null);
        }else{
            callback(null, 'Unable to fetch weather');
        }
    });
};

module.exports.getForecast = getForecast;