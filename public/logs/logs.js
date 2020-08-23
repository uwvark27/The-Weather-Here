
 //Making a map and tiles
 const mymap = L.map('WeatherMap').setView([0,0], 1);

 const attribution = 
     '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

 const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tiles = L.tileLayer(titleUrl, {attribution});
 tiles.addTo(mymap);

 //execute the function
 getData();

 //define the function
 async function getData() {
     //get the info from the page
     const response = await fetch('/api');
     //put this repsonse into json format
     const data = await response.json();
    console.log(data);

     for (item of data) {

        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

         //Make a DIV for each data point
        //  const root = document.createElement('p');
        //  const geo = document.createElement('div');
        //  const date = document.createElement('div');
         
        //  //Fill in the text contents
        //  geo.textContent = `${item.lat}°, ${item.lon}°`;
        //  const dateString = new Date(item.timestamp).toLocaleString();
        //  date.textContent = dateString;

        //  //Put all DIVs in a CONTAINER called ROOT
        //  root.append(geo, date);
        //  //Append them to the page
        //  document.body.append(root);
     }
  
 }