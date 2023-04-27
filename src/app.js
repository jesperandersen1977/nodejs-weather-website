const path = require('path');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');
const express = require('express');

const hbs = require('hbs');
const { callbackify } = require('util');

const port = process.env.port || 3000;

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// setup handledbars engine sand views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Front page',
        name: 'Jesper Andersen'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        helpText: 'helptext',
        name: 'Jesper Andersen'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The help page',
        name: 'Jesper Andersen'
    })
})


app.get('/weather', (req, res) => {
    console.log(req.query.address);
    if (!req.query.address)
    {
       return res.send({
        error: 'The was no address inserted during search'
       })
    }

    // latitude, longitude, location is destructured from an overall object
    // the callback is object body where latitude, longitude, location is properties
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        console.log(latitude);
        forecast(longitude, latitude, (error, forecastData) => {
            console.log(latitude);
            console.log(forecastData);
            if (error) {
                return console.log(error);
            }
            else {
               return res.send({
                    weather: {
                        forecast: forecastData,
                        longitude: longitude,
                        latitude: latitude,
                        location: location
            
                    }
                });

            }
        })
    });

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide some search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('', {
        title: '404',
        name: 'Jesper Andersen',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('', {
        title: '404',
        name: 'Jesper Andersen',
        errorMessage: 'Page not found'
    });
}

)
app.listen(port, () => {
    console.log('server is up on port ' + port);
});

