angular.module('GiffyGif.controllers', []).

    /* Main controller */
    controller('mainController', function($scope, $routeParams, giphyAPIservice) {
        $scope.gifs = [];
        $scope.currentPage = 1;
        $scope.totalPages = 1;
        $scope.totalResults = 0;
        $scope.keyword = "kittens";
        $scope.loading = false;

        var limit = 20;
        var offset = 0;

        // pagination functions
        $scope.back = function() {
            if ($scope.currentPage == 1) {
                return;
            }
            offset -= limit;
            $scope.currentPage--;

            refresh();
        };

        $scope.next = function() {
            offset += limit;
            $scope.currentPage++;

            refresh();
        };

        // toggle puppies / kittens
        $scope.puppies = function() {
            $scope.currentPage = 1;
            offset  = 0;
            $scope.keyword = "cute+puppies";

            refresh();
        };
        $scope.kittens = function() {
            $scope.currentPage = 1;
            offset = 0;
            $scope.keyword = "cute+kittens";

            refresh();
        };
        $scope.swapAnimals = function() {
            $scope.currentPage = 1;
            offset = 0;
            if ($scope.keyword == 'kittens')
              $scope.keyword = 'puppies';
            else
              $scope.keyword = 'kittens';

            refresh();
        };

        $scope.popupModal = function(gifUrl) {
          $('.modal img').attr('src', gifUrl);
          $('#gifModal').modal('show');
        };
        // request new gifs
        var refresh = function() {
            $scope.loading = true;
            giphyAPIservice.getCuteAnimals('cute+' + $scope.keyword, limit, offset).success(function (response) {
                $scope.gifs = response.data;
                $scope.totalResults = response.pagination.total_count;
                $scope.totalPages = Math.ceil($scope.totalResults / limit);
                $scope.loading = false;
                console.log(response);
            });
        };

        refresh();

});
