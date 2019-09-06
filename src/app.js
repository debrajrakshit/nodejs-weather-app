const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const { geocode, geocodeReverse } = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead',
        helpText: 'Helpful texts'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead',
        image: '/images/toaster.png'
    });
});

app.get('/weather', (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const address = req.query.address;

    // console.log(latitude, longitude);

    if(!address){
        if(!latitude || !longitude){
            return res.send({
                error: 'Please provide an address!'
            });
        }
    }

    // weather data with location name
    geocode(address, latitude, longitude, (err, {latitude, longitude, place_name, address} = {}) => {
        if(err) {
            return res.send({
                error: 'Invalid Location!'
            });
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if(err){
                return res.send({
                    error: 'Error fetching data!'
                });
            }

            res.send({
                forecast: forecastData,
                location: place_name,
                address: address
            });
        });
    });
    
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});