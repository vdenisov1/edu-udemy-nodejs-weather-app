require("dotenv").config();
const yargs = require('yargs');
const axios = require('axios');
const geocode = require('./geocode/promise');
const forecast = require('./forecast/promise');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geoCodeAddress(argv.address)
    .then((geocode) => {
        return forecast
          .getForecast(geocode.lat, geocode.lng)
          .then(forecast => {
              console.log(`Current Temperature in ${geocode.formatted_address} is ${forecast.currentTemp} but it feels like ${forecast.apparentTemperature}`);
          });
    })
    .catch((errorMessage) => {
        console.log('Error: ', errorMessage);
    });
