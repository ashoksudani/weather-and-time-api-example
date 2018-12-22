(function() {
  const delay = ms =>
    new Promise(resolve => {
      setTimeout(resolve, ms);
    });

  const requestObjectDefatulProps = {
    method: 'GET',
    mode: 'no-cors',
    cache: 'default'
  };

  const apiFetchCurrentTime = location => {
    /*

    //Commenting this code as I tried to use it but its not working as CORS header : 'Access-Control-Allow-Origin' is not present in response header and thus raising CORS error in browser

    let timeAPIUrl =
      'https://www.amdoren.com/api/timezone.php?api_key=gRMR2munajXCa3u9kcTqpakrt2m5fa&loc=';
    timeAPIUrl += encodeURIComponent(location);

    return fetch(timeAPIUrl, requestObjectDefatulProps).then(response =>
      response.json()
    );

    */

    //For demonstration returning sample data with fake promise
    return delay(500).then(() => ({
      error: 0,
      error_message: '-',
      time: '2018-12-22 09:59:53',
      timezone: 'Greenwich Mean Time',
      offset: 0,
      daylight_savings: 'No daylight savings'
    }));
  };

  const apiFetchWeather = location => {
    /* 

	//Commenting this code as I tried to use it but its not working as CORS header : 'Access-Control-Allow-Origin' is not present in response header and thus raising CORS error in browser

	let weatherApiUrl = 'https://samples.openweathermap.org/data/2.5/weather?appid=97b2d9bfb66fcd7402f68df1eb44a02b&q=';   
	weatherApiUrl += encodeURIComponent(location)
	
  return fetch(weatherApiUrl, requestObjectDefatulProps).then(response => response.json());

*/

    //For demonstration returning sample data with fake promise
    return delay(500).then(() => ({
      coord: {
        lon: -0.13,
        lat: 51.51
      },
      weather: [
        {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d'
        }
      ],
      base: 'stations',
      main: {
        temp: 280.32,
        pressure: 1012,
        humidity: 81,
        temp_min: 279.15,
        temp_max: 281.15
      },
      visibility: 10000,
      wind: {
        speed: 4.1,
        deg: 80
      },
      clouds: {
        all: 90
      },
      dt: 1485789600,
      sys: {
        type: 1,
        id: 5091,
        message: 0.0103,
        country: 'GB',
        sunrise: 1485762037,
        sunset: 1485794875
      },
      id: 2643743,
      name: 'London',
      cod: 200
    }));
  };

  function retrieveTimeAndWeather(location, postalCode) {
    if (!location) {
      throw new Error('Location is undefined');
    }

    return Promise.all([
      apiFetchCurrentTime(location),
      apiFetchWeather(location)
    ]);
  }

  function init() {
    document.addEventListener('DOMContentLoaded', function(event) {
      const form = document.querySelector('#main-form');
      const locationInput = document.querySelector('#input-location');
      const postalCodeInput = document.querySelector('#postal-code');
      const resultArea = document.querySelector('.api-results');
      form.addEventListener('submit', event => {
        event.preventDefault();

        const location = locationInput.value;
        if (!location) {
          resultArea.innerHTML =
            '<p class="text-danger">Pleaes enter location</p>';
          return;
        }

        const postalCode = postalCodeInput.value;
        if (!postalCode) {
          resultArea.innerHTML =
            '<p class="text-danger">Pleaes enter postal code</p>';
          return;
        }

        resultArea.innerHTML = '... Fetching';

        retrieveTimeAndWeather(location, postalCode).then(
          results => {
            resultArea.innerHTML = `
          <p>
            <b>Location</b>: ${location}
            <br/><b>Current Time</b>: ${results[0].time}
            <br/><b>Weather</b>: 
              Temp: ${results[1].main.temp} : min - ${
              results[1].main.temp_min
            } : max - ${results[1].main.temp_max} 
              Humidity: ${results[1].main.humidity}
              ${results[1].weather.main} - ${
              results[1].weather.description
            }         
          </p>`;
          },
          values => {
            resultArea.innerHTML = `<p class="text-danger">Error Occured : ${values[0] ||
              ''}, ${values[1] || ''}</p>`;
          }
        );
      });
    });
  }

  init();
})();
