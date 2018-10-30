require("dotenv").config();
const yargs = require('yargs');
const geocode = require('./geocode');
const forecast = require('./forecast');

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
const address = argv.address;

geocode.geoCodeAddress(address, (geocode, error) => {
    if(error) {
        console.log(error);
    }else{
        console.log(`Address: ${geocode.formatted_address} (${geocode.lat},${geocode.lng})`);

        forecast.getForecast(geocode.lat, geocode.lng, (forecastResponse, forecastError) => {
            if (forecastError){
                console.log(forecastError);
            }else{
                console.log(`Current Temperature in ${geocode.formatted_address} is ${forecastResponse.currentTemp} but it feels like ${forecastResponse.apparentTemperature}`);
            }
        });
    }
});