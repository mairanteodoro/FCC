function success(position) {
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  lat.innerHTML = 'Latitude is ' + latitude + '°';
  lon.innerHTML = 'Longitude is ' + longitude + '°';
}

function error() {
  output.innerHTML = "Unable to retrieve your location";
}

// run script only after page has been loaded
$( document ).ready(function() {
  var lat = document.getElementById("lat");
  var lon = document.getElementById("lon");

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
