const request = require('postman-request');

const forecast = (longetude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c411cbde935707e0029ffcf3d75ec2fd&query=' + latitude + ',' + longetude + '&units=m';

    request({
        url,
        json: true,
    }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to get weather for the location', undefined);
        }
        else
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' Degrees outside but it feels like: ' + body.current.feelslike);
    })

}

module.exports = forecast;