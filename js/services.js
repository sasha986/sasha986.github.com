
angular.module('GiffyGif.services', [])
  .factory('giphyAPIservice', function($http) {

    var giphyAPI = {};

    giphyAPI.getCuteAnimals = function(searchQuery="cute+animals", limit=15, offset=0) {
      return $http.get('http://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=dc6zaTOxFJmzC&limit=' + limit + '&offset=' + offset);
    }

    return giphyAPI;
  });