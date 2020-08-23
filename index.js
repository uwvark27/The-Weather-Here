const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

console.log(process.env);

const app = express();
app.listen(3000, () => console.log('Weather! Listening at Port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


app.get('/api', (request, response) => {
    database.find({}, (err,data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

//new way: use the nedb database
const database = new Datastore('database.db');
database.loadDatabase();

//and NEW WAY: Refactored
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weather_reponse = await fetch(weather_url);
    const weather_data = await weather_reponse.json();
    

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_reponse = await fetch(aq_url);
    const aq_data = await aq_reponse.json();
    
    const data = {
        weather: weather_data,
        air_quality: aq_data
    };
    response.json(data);
});
