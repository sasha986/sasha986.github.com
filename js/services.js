
angular.module('GiffyGif.services', [])
  .factory('giphyAPIservice', function($http) {

    var giphyAPI = {};

    giphyAPI.getCuteAnimals = function(searchQuery, limit, offset) {
      return $http.get('https://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=dc6zaTOxFJmzC&limit=' + limit + '&offset=' + offset);
    }

    return giphyAPI;
  });
