const request = require('postman-request');

const geoCode = (address, callback) => {
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamExOTc3IiwiYSI6ImNsZ2x3czhiYzAwNzIzbHJ5ZG1sYjZ0ODQifQ.8XkyAvp7DCAp_0dsKA49aw&limit=1';
    request({ url: urlMapBox, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Try another search', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;
