(function(){

  "use strict";

  var app = angular.module('weather-app', ['ui.bootstrap']);

  app.controller('appController', function($scope, $http){

    // recommended API
    var API_ROOT = "http://api.openweathermap.org/data/2.5/";
    var OPTIONS = "&APPID=0b9699d2b3335bf49f8d8bd6ea6ae3e3";

    $scope.isCelsius = true;
    var precision = 1;

    $scope.toggleMode = function() {
      $scope.isCelsius = !$scope.isCelsius;
      if ($scope.isCelsius === false) {
        $scope.temp = (($scope.curTemp * 9/5) + 32).toFixed(precision);
        $scope.tempMin = (($scope.minTemp * 9/5) + 32).toFixed(precision);
        $scope.tempMax = (($scope.maxTemp * 9/5) + 32).toFixed(precision);
        $scope.unit = 'F';
      } else {
        $scope.temp = ($scope.curTemp).toFixed(precision);
        $scope.tempMin = ($scope.minTemp).toFixed(precision);
        $scope.tempMax = ($scope.maxTemp).toFixed(precision);
        $scope.unit = 'C';
      }
    };

    $scope.fetch = function (position){
      $scope.lat = position.coords.latitude;
      $scope.lon = position.coords.longitude;
      var data;
      // calling the API (when using "$http.jsonp" the callback must be "JSON_CALLBACK")
      $http.jsonp(API_ROOT + "weather?lat=" + $scope.lat + "&lon=" + $scope.lon + "&callback=JSON_CALLBACK" + OPTIONS)
      .then(function(response){
        console.log(response.data);
        data = response.data;
        // city's name
        $scope.city = data.name;
        // temperatures in Celsius
        $scope.curTemp = data.main.temp - 273.15;
        $scope.minTemp = data.main.temp_min - 273.15;
        $scope.maxTemp = data.main.temp_max - 273.15;
        $scope.temp = ($scope.curTemp).toFixed(precision);
        $scope.tempMin = ($scope.minTemp).toFixed(precision);
        $scope.tempMax = ($scope.maxTemp).toFixed(precision);
        $scope.unit = 'C';

        var today = new Date();
        var hour = today.getHours();
        var suffix, suffix2;
        if (hour > 6 && hour < 20) {
            //Day time
           suffix = "-d";
           suffix2 = "-day-";
           $scope.selBackground = {
             'background': 'url(./images/sunset-lake-national-park-wallpaper-1.jpg)',
             'background-size': 'cover',
             'background-position': '0% 0%',
             'background-repeat': 'no-repeat',
             'background-color': 'white',
             'color': 'white',
           };
           $scope.bodyBackgroundColor = {
             'background-color': '#FFF',
           };
        } else {
            //Night time
           suffix = "-n";
           suffix2 = "-night-";
           $scope.selBackground = {
             'background': 'url(./images/night-sky-over-the-mountain-lake-wallpaper-1.jpg)',
             'background-size': 'cover',
             'background-position': '0% 25%',
             'background-repeat': 'no-repeat',
             'color': 'gray',
           };
           $scope.bodyBackgroundColor = {
             'background-color': '#000',
           };
        }

        // GET THE ICON CORRESPONDING TO THE CURRENT CODE
        // CSS code from http://websygen.github.io/owfont/#icon-list
        // $scope.icon = "owf owf-"+(data.weather[0].id)+suffix+" owf-5x";
        // var $scope.iconMap;
        $http.get("./content/iconMap.json")
        .then(function(response){
          $scope.iconMap = response.data;
          console.log($scope.iconMap[data.weather[0].id].label);
          $scope.icon = "wi wi-"+($scope.iconMap[data.weather[0].id].label);
          console.log($scope.icon);
        });

        // data.weather[0].id = 600;
        console.log(data.weather[0].id);


        // weather conditions
        //
        // Check different codes to switch background accordingly:
        // http://openweathermap.org/weather-conditions
        //
        // How to get icon URL
        // For code 501 - moderate rain icon = "10d"
        // URL is
        // http://openweathermap.org/img/w/10d.png
        // if (data.weather[0].id >= 200 && data.weather[0].id < 300) {
        //   // Group 2xx: Thunderstorm
        //   $scope.selBackground = {
        //     'background': 'url(./images/thunderstorm.jpg)',
        //     'background-size': 'cover'
        //   };
        //   $scope.selIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
        // }
        // if (data.weather[0].id >= 300 && data.weather[0].id < 500) {
        //   // Group 3xx: Drizzle
        //   $scope.selBackground = {
        //     'background': 'url(./images/drizzle.jpg)',
        //     'background-size': 'cover'
        //   };
        // }
        // if (data.weather[0].id >= 500 && data.weather[0].id < 600) {
        //   // Group 5xx: Rain
        //   $scope.selBackground = {
        //     'background': 'url(./images/cloudy.jpg)',
        //     'background-size': 'cover'
        //   };
        // }
        // if (data.weather[0].id >= 600 && data.weather[0].id < 700) {
        //   // Group 6xx: Snow
        //   $scope.selBackground = {
        //     'background': 'url(./images/snow.jpeg)',
        //     'background-size': 'cover'
        //   };
        // }
        // if (data.weather[0].id > 800 && data.weather[0].id < 900) {
        //   // Group 80x: Clouds
        //   console.log(data.weather[0].description);
        //   $scope.selBackground = {
        //     'background': 'url(./images/cloudy.jpg)',
        //     'background-size': 'cover'
        //   };
        // }
        // if (data.weather[0].id === 800) {
        //   // Group 800: Clear Sky
        //   $scope.selBackground = {
        //     'background': 'url(./images/clearsky.jpg)',
        //     'background-size': 'cover'
        //   };
        //   // $scope.selIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
        // }

      });
    };


    $scope.showError = function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          $scope.error = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          $scope.error = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          $scope.error = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          $scope.error = "An unknown error occurred.";
          break;
      }
      $scope.$apply();
    };


    $scope.getLocation = function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition($scope.fetch, $scope.showError);
      }
      else {
          $scope.error = "Geolocation is not supported by this browser.";
      }
    };


    $scope.getLocation();

  });

})();
