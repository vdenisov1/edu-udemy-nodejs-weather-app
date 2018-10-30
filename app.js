require("dotenv").config();
const request = require('request');
const yargs = require('yargs');

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

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    json: true
  }, (error, response, body) => {
    if(response.statusCode !== 200) {
        console.log('Unable to connect to Google server');
    }else if(body.status === "OK") {
        const result = body.results.pop();
        console.log(`Address: ${result.formatted_address}`);
        console.log(`Lat: ${result.geometry.location.lat}\nLong: ${result.geometry.location.lng}`);
    }else if(body.status === "ZERO_RESULTS") {
        console.log(`Unable to find that address: ${address}`);
    }
  }
);