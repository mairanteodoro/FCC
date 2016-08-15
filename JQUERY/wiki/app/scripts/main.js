//
// Locally disabling JSHint warning W117 ('blah' is not defined)
// (https://man42.net/blog/2013/04/jshint-disable-warning-globally/)
//
/*jshint -W117 */

$(document).ready(function(){

  'use strict';

  // console.log("Oh, well... I'm loaded without errors.");

  // gain focus on page load
  $('#searchTerm').focus();
  // clear input box
  $('#searchTerm').val('');

  // this will make it possible to run the search by
  // either clicking on #search button or by hitting enter
  $('#searchTerm').keypress(function(event) {
    // console.log('This is keyCode: ' + event.keyCode);
    if (event.keyCode === 13) {
      $('#search').trigger('click');
    }
  });

  $('#search').click(function(){
    // console.log($('#searchTerm').val());
    var searchTerm = $('#searchTerm').val();
    var API_ROOT = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var API_OPTIONS = '&callback=JSON_CALLBACK';

    // console.log(API_ROOT + searchTerm + API_OPTIONS);
    // console.log(searchTerm.length);

    if (searchTerm.length > 0) {
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: API_ROOT + searchTerm + API_OPTIONS,
        success: function(data) {
          // work the results here
          // console.log(data);
          // console.log(Object(data).hasOwnProperty('query'));
          // console.log(Object(data.query).hasOwnProperty('pages'));
          if (Object(data.query).hasOwnProperty('pages')) {
            var pages = data.query.pages;
            // clear previous results
            $('#showResults').empty();
            $('#showResults').html('<br>');
            $.each(pages, function(index, page){
              $('#showResults').append(
                                        '<div class="panel panel-primary">' +
                                          '<div class="panel-heading">' +
                                            '<h3 class="panel-title"> <a href="http://en.wikipedia.org/?curid=' +
                                            page.pageid + '">' + page.title + '</a></h3>' +
                                          '</div>' +

                                          '<div class="panel-body">' +
                                            '<em>"' + page.extract + '"</em>' +
                                          '</div>' +
                                        '</div>'
                                      );
            });
          } else {
            $('#showResults').empty();
            $('#showResults').append(
                                      '<div class="alert alert-danger" role="alert">' +
                                        '<span style="font-size:2em;" class="glyphicon glyphicon-thumbs-down"></span>' +
                                        '<h3>Oops... no entries found for "' + searchTerm + '".</h3>' +
                                      '</div>'
                                    );
          }
        },
        error: function() {
          // console.log("An error occurred...");
        }
      });
    } else {
      $('#searchTerm').focus();
    }
  });

  $('#randomPage').click(function () {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });

});
