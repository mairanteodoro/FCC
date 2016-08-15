/*globals $:false */
$(document).ready(function() {

  "use strict";

  $('#toggleModeButton').on('click', function() {

    // retrieve the text from HTML doc
    var str1 = document.getElementById("temp").innerHTML;
    var str2 = document.getElementById("tempMin").innerHTML;
    var str3 = document.getElementById("tempMax").innerHTML;
    // retrieve the numeric part of the text
    var temp1 = parseFloat($('#temp').text(), 10);
    var temp2 = parseFloat($('#tempMin').text(), 10);
    var temp3 = parseFloat($('#tempMax').text(), 10);

    var tempStr = '';
    var temp12;
    // retrieve current state, initially undefined
    var state = $(this).data('state');
    // toggle the state - first click will make this "true"
    state = !state;
    if (state) {
      // swap units
      tempStr = str1.replace('C', 'F');
      // convert temperature from C to F
      temp12 = ((temp1 * 9/5) + 32);
      tempStr = tempStr.replace(temp1.toFixed(1), temp12.toFixed(1));
      // update HTML text
      document.getElementById("temp").innerHTML = tempStr;

      tempStr = str2.replace('C', 'F');
      temp12 = ((temp2 * 9/5) + 32);
      tempStr = tempStr.replace(temp2.toFixed(1), temp12.toFixed(1));
      document.getElementById("tempMin").innerHTML = tempStr;

      tempStr = str3.replace('C', 'F');
      temp12 = ((temp3 * 9/5) + 32);
      tempStr = tempStr.replace(temp3.toFixed(1), temp12.toFixed(1));
      document.getElementById("tempMax").innerHTML = tempStr;
    } else {
      // swap units
      tempStr = str1.replace('F', 'C');
      // convert temperature from C to F
      temp12 = (temp1 - 32) * 5/9;
      tempStr = tempStr.replace(temp1.toFixed(1), temp12.toFixed(1));
      // update HTML text
      document.getElementById("temp").innerHTML = tempStr;

      tempStr = str2.replace('F', 'C');
      temp12 = (temp2 - 32) * 5/9;
      tempStr = tempStr.replace(temp2.toFixed(1), temp12.toFixed(1));
      document.getElementById("tempMin").innerHTML = tempStr;

      tempStr = str3.replace('F', 'C');
      temp12 = (temp3 - 32) * 5/9;
      tempStr = tempStr.replace(temp3.toFixed(1), temp12.toFixed(1));
      document.getElementById("tempMax").innerHTML = tempStr;
    }
    // put the state back
    $(this).data('state', state);

  });

  var today = new Date();
  var hour = today.getHours();
  if (hour > 6 && hour < 20) {
     //Day time
    $("#selBackground").css({
      'background': 'url(./images/sunset-lake-national-park-wallpaper-1.jpg)',
      'background-size': 'cover',
      'background-position': '0% 0%',
      'background-repeat': 'no-repeat',
      'background-color': 'white',
      'color': 'white',
    });
    $("#bodyBackgroundColor").css({
      'background-color': '#FFF',
    });
  } else {
     //Night time
    $("#selBackground").css({
      'background': 'url(./images/night-sky-over-the-mountain-lake-wallpaper-1.jpg)',
      'background-size': 'cover',
      'background-position': '0% 25%',
      'background-repeat': 'no-repeat',
      'color': 'gray',
    });
    $("#bodyBackgroundColor").css({
      'background-color': '#000',
    });
  }

});

function tempConv(x) {
  "use strict";
  return (x - 273.15);
}

function success(position) {

  "use strict";
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  var API_ROOT = "http://api.openweathermap.org/data/2.5/";
  var OPTIONS = "&APPID=0b9699d2b3335bf49f8d8bd6ea6ae3e3";

  // console.log(API_ROOT + "weather?lat=" + latitude + "&lon=" + longitude + "&callback=JSON_CALLBACK" + OPTIONS);

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    jsonp: "callback", jsonpCallback: "callback",
    url: API_ROOT + "weather?lat=" + latitude + "&lon=" + longitude + OPTIONS,
    success: function (response) {

      var data = response;
      var temp = tempConv(data.main.temp);
      var tempMin = tempConv(data.main.temp_min);
      var tempMax = tempConv(data.main.temp_max);

      $("#city").html(data.name);
      $("#temp").html('<i class="wi wi-thermometer"></i> ' + temp.toFixed(1) + " &deg;C");
      $("#tempMin").html('<i class="wi wi-direction-down"></i> ' + tempMin.toFixed(1) + " &deg;C");
      $("#tempMax").html('<i class="wi wi-direction-up"></i> ' + tempMax.toFixed(1) + " &deg;C");

      // get icon
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "./content/iconMap.json",
        success: function(response){

          var iconMap = response;
          var icon = "wi wi-"+(iconMap[data.weather[0].id].label);
          $("#icon").addClass(icon);
        }
      });

     }
 });

}

function error() {

  "use strict";
  var output = document.getElementById("lat");

  output.innerHTML = "Unable to retrieve your location";

}

// run script only after page has been loaded
$(document).ready(function() {

  "use strict";
  navigator.geolocation.getCurrentPosition(success, error);

});



// from
// http://apidev.accuweather.com/developers/locationAPIcodesamples
//

// <script type="text/javascript">
 //        jQuery(document).ready(function ($) {
 //           $("#searchtext").keyup(function () {
 //                getAutoCompleteValues($("#searchtext").first().attr("value"));
 //            });
 //        });
 //
 //    function getAutoCompleteValues(val) {
 //
 //            if (val.length < 3) return false;
 //            $.ajax({
 //               type: "GET",
 //               dataType: "jsonp",
 //               jsonp: "callback", jsonpCallback: "callback",
 //               url: "http://apidev.accuweather.com/locations/v1/cities/autocomplete?apikey={your key}&q=" + val,
 //               cache: false,
 //               success: function (data) {
 // //                    alert(data);
 //                  $("#results").html('');
 //
 //                    $.each(data, function (i, item) {
 //                     $("#results").append(+ item.LocalizedName + ", " + item.AdministrativeArea.ID + ", " + item.Country.ID );
 //                  });
 //                }
 //          });
 //     }
//    </script>
