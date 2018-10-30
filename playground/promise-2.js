require('dotenv').config();
const request = require("request");
const REQUEST_URL = "https://maps.googleapis.com/maps/api/geocode/json";

let geocodeAddress = (address) => {
    const options = { 
        url: `${REQUEST_URL}?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`, 
        json: true 
    };

    return new Promise( (resolve, reject) => {
        request(options, (error, response, body) => {
            if (response.statusCode !== 200) {
                reject("Unable to connect to Google Server");
            } else if (body.status === "OK") {
                const result = body.results.pop();
                resolve({ 
                    formatted_address: result.formatted_address, 
                    lat: result.geometry.location.lat, 
                    lng: result.geometry.location.lng 
                });
            } else if (body.status === "ZERO_RESULTS") {
                reject(`Unable to find that address: ${address}`);
            }
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage) => {
    console.log(errorMessage);
});