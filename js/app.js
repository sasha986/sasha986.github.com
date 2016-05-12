
angular.module('GiffyGif', [
  'GiffyGif.services',
  'GiffyGif.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when("/", {templateUrl: "templates/main.html", controller: "mainController"}).
    //when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
    otherwise({redirectTo: '/1'});
}]);
