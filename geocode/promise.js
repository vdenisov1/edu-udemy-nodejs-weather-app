const axios = require('axios');
const REQUEST_URL = "https://maps.googleapis.com/maps/api/geocode/json";

let geoCodeAddress = (address) => {
    const geocodeUrl = `${REQUEST_URL}?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return new Promise((resolve, reject) => {
        axios.get(geocodeUrl)
            .then((response) => {
                if (response.data.status === 'ZERO_RESULTS')
                    throw new Error(`Unable to find address ${address}`);

                const result = response.data.results.pop();

                const location = {
                    formatted_address: result.formatted_address,
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng
                };

                resolve(location);
            })
            .catch((e) => {
                if (e.code === 'ENOTFOUND') {
                    reject('Unable to connect to Google server');
                } else {
                    reject(e.message);
                }
            });
    });
};

module.exports.geoCodeAddress = geoCodeAddress;