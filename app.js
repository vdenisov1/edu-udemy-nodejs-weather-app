require("dotenv").config();
const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
        console.log(`Address: ${geocode.formatted_address}`);
        console.log(`Latitude: ${geocode.lat}\nLongitude: ${geocode.lng}`)
    }
});