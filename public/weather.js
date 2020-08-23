
function setup() {

    let lat, lon;
    const button = document.getElementById('submit');

    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);
            const api_url = `weather/${lat},${lon}`;
            const reponse = await fetch(api_url);
            const json = await reponse.json();
            console.log(json);
            const weather = json.weather.weather[0].main;
            const tempK = json.weather.main.temp;
            
            document.getElementById('summary').textContent = weather;
            const tempF = ((tempK-273.15)*1.8)+32;
            document.getElementById('temperatureF').textContent = tempF.toFixed(1);
            const tempC = (tempK-273.15);
            document.getElementById('temperatureC').textContent = tempC.toFixed(1);
            document.getElementById('loc').textContent = json.weather.name;
 
            var air = [];
            if (json.air_quality.results.length > 0) {
                air = json.air_quality.results[0].measurements[0];
                document.getElementById('aq_parameter').textContent = air.parameter;
                document.getElementById('aq_value').textContent = air.value;
                document.getElementById('aq_units').textContent = air.unit;
                document.getElementById('aq_date').textContent = air.lastUpdated;
            } else {
                air = 'NO VALUE';
                document.getElementById('aq_parameter').textContent = 'NO VALUE';
                document.getElementById('aq_value').textContent = 'NO VALUE';
                document.getElementById('aq_units').textContent = 'NO VALUE';
                document.getElementById('aq_date').textContent = 'NO VALUE'; 
            }

            const data = { lat, lon, weather, tempF, air };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);
            
        });
    } else {
        console.log('geolocation not available');
    }

    //Handle button presses, submit data to database
    // button.addEventListener('click', async event => {
    //     const data = { lat, lon };
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //      };
    //     const response = await fetch('/api', options);
    //     const json = await response.json();
    //     console.log(json);
    // });

}//END SETUP

    