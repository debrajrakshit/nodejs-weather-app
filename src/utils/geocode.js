const request = require('request');

const geocode = (address, latitude, longitude, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVicmFqciIsImEiOiJjanpnaWk1bTQwbTk2M2Jqd2M0ZzB1M3NzIn0.cA1Qi7drrEGlvO8R5HYWwg&limit=1';

    if(!address){
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}.json?access_token=pk.eyJ1IjoiZGVicmFqciIsImEiOiJjanpnaWk1bTQwbTk2M2Jqd2M0ZzB1M3NzIn0.cA1Qi7drrEGlvO8R5HYWwg&limit-=1`;
    }

    //console.log(url);

    request({url: url, json: true}, (err, { body }) => {
        if(err){
            callback(err, 'Unable to connect to location services!');
        }
        else if(!body.features[0]) {
            callback(err, 'Unable to find geolocation coordinates!');
        }
        else{
            const place_name = body.features[0].place_name;
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const address = body.features[0].text;

            callback(err, {
                latitude: latitude,
                longitude: longitude,
                place_name: place_name,
                address: address
            });
            
        }
    });
}

// nouse- alternate method
const geocodeReverse = ({latitude, longitude}, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}.json?access_token=pk.eyJ1IjoiZGVicmFqciIsImEiOiJjanpnaWk1bTQwbTk2M2Jqd2M0ZzB1M3NzIn0.cA1Qi7drrEGlvO8R5HYWwg&limit-=1`;

    request({url: url, json: true}, (err, { body }) => {
        if(err){
            callback(err, 'Unable to connect to location services!');
        }
        else if(!body.features[0]) {
            callback(err, 'Unable to find geolocation coordinates!');
        }
        else{
            const place_name = body.features[0].place_name;
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const address = body.features[0].text;
                
            callback(err, {
                latitude: latitude,
                longitude: longitude,
                place_name: place_name,
                address: address
            });
        }
    });
}


module.exports = {
    geocode,
    geocodeReverse
};