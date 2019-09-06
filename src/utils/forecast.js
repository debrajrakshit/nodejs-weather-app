const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bc7cdcfb5243a29d76c2b1e1b99b3d03/'+ latitude + ',' + longitude;

    request({url: url, json: true}, (err, { body }) => {
        if(err){
            callback(err, 'Unable to connect to weather service!');
        }
        else if(body.error){
            callback(err, 'Unable to find location.');
        }
        else{
            callback(err, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' + ' Temp Min: ' + body.daily.data[0].temperatureMin + ' Temp Max: ' + body.daily.data[0].temperatureMax);
        }
        
    });
}

module.exports = forecast;