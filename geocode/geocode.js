const request = require('request');

let geoCodeAddress = (address, callback) => {
    const options = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
        json: true
    };

    request(options, (error, response, body) => {
        if (response.statusCode !== 200) {
            callback(null, 'Unable to connect to Google server');
        } else if (body.status === "OK") {
            const result = body.results.pop();
            callback({
                formatted_address: result.formatted_address,
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng
            }, null);
        } else if (body.status === "ZERO_RESULTS") {
            callback(null, `Unable to find that address: ${address}`);
        }
    });
};

module.exports.geoCodeAddress = geoCodeAddress;