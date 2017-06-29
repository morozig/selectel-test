angular.module('todoApp', [])
    .controller('WeatherController', function ($http, $httpParamSerializer) {
        const weather = this;

        weather.search = function () {
            const serializedParams = $httpParamSerializer({
                q: weather.city,
                appid: 'aa552b5a64d281628ecfa8a21e0041fd'
            });
            const url = 'http://api.openweathermap.org/data/2.5/weather?'
                + serializedParams;
            $http.get(url).then(function (response) {
                const kelvin = response.data.main.temp;
                weather.temp = Math.floor(kelvin - 273.15);
                const iconId = response.data.weather[0].icon;
                weather.icon = `http://openweathermap.org/img/w/${iconId}.png`;
                weather.wind = response.data.wind.speed;
            }).catch(function (error) {
                weather.temp = undefined;
            });
        };
    })
    .config(function ($sceProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects or libraries.
        $sceProvider.enabled(false);
    });
