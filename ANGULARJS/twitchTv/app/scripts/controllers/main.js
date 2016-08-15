'use strict';

/**
 * @ngdoc function
 * @name twitchTvApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitchTvApp
 */
angular.module('twitchTvApp')
  .controller('MainCtrl', function ($scope, $http) {

    // array of streamers
    // ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","nickmercs"]
    $scope.streamers = [
                      "freecodecamp",
                      "storbeck",
                      "terakilobyte",
                      "habathcx",
                      "RobotCaleb",
                      "thomasballinger",
                      "noobs2ninjas",
                      "beohoff",
                      "brunofin",
                      "comster404",
                      "test_channel",
                      "cretetion",
                      "sheevergaming",
                      "TR7K",
                      "OgamingSC2",
                      "ESL_SC2",
                    ];

    $scope.showAll = false;
    $scope.showOnline = false;
    $scope.showOffline = false;


    // handling errors
    function oops(error, item) {
      console.log(error.status +': Error retrieving the data from ' + item + ': ' + error.message);
      $scope.all.push([item, "", "Disabled", "http://www.susansolovic.com/blog/wp-content/uploads/2014/12/Sorry-Closed-Sign-public-domain-300x300.png"]);

    }


    // go get the data
    function fetch(data, item) {

      // $scope.data = data;
      console.log(item, data);
      if (data.data.logo === null) {
        data.data.logo = "https://upload.wikimedia.org/wikipedia/en/b/b7/Nologo.png";
        // "http://brighttribe.org.uk/wp-content/uploads/2015/07/people-placeholder-300x300.png";
        // "http://chic-chester.co.uk/wp-content/uploads/2014/08/20140806_LogoSupporterPlaceholder4-300x300.png"
      }

      // now retrieve info about streams to test wether the channel is online or not
      $http.get('https://api.twitch.tv/kraken/streams/' + item)
        .then(function(response) {

          // console.log('Streamer ' + count + ': ' + item);
          console.log(item, response.data);
          // console.log(data.url);
          if (Object(response.data).hasOwnProperty('stream') === false) {
            // console.log(item + ' is not a single channel.');
          } else if (Object(response.data).hasOwnProperty('stream') === true && response.data.stream === null) {
            // console.log(item + ' is offline.');
            // NB: always use local variables instead of $scope
            $scope.offline.push([data.data.display_name, data.data.url, "Offline", data.data.logo]);
            $scope.all.push([data.data.display_name, data.data.url, "Offline", data.data.logo]);
          } else {
            // console.log(item + ' is online.');
            // NB: always use local variables instead of $scope
            $scope.online.push([data.data.display_name, data.data.url, "Online", data.data.logo]);
            $scope.all.push([data.data.display_name, data.data.url, "Online", data.data.logo]);
          }

        }, function(response) {

          console.log(response.data, item);

        });

    }



    $scope.callRestService = function() {

      console.log($scope.showAll, $scope.showOnline, $scope.showOffline);

      $scope.API_ROOT = "";
      $scope.API_OPTIONS = "";
      $scope.searchTerm = "";
      $scope.online = [];
      $scope.offline = [];
      $scope.error = [];
      $scope.all = [];
      // $scope.logo = [];
      console.log("OK, I'm in.");
      console.log("I'll try to fetch data now...");

      var count = 0;
      $scope.streamers.forEach(function(item){

        console.log('Channel ' + count + ': ' + item);

        // first retrieve info about the channel
        $http.get('https://api.twitch.tv/kraken/channels/' + item)
          .then(function(response) {

            fetch(response, item);

          }, function(error) {

            oops(error, item);

          });

        count += 1;

      });

      console.log($scope.showAll, $scope.showOnline, $scope.showOffline);

    };

  });
