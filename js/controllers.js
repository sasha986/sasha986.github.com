angular.module('GiffyGif.controllers', []).

  /* Main controller */
  controller('mainController', function($scope, $routeParams, giphyAPIservice) {
    $scope.gifs = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalResults = 0;
    $scope.keyword = "cute+animals";
    $scope.search = ""
    $scope.currentLimit = 15;
    $scope.limits = [
      { id: 1, value: 10 },
      { id: 2, value: 15 },
      { id: 3, value: 25 },
      { id: 4, value: 50 }
    ];

    var offset = 0;

    // pagination functions
    // back page
    $scope.back = function() {
      if ($scope.currentPage == 1) {
          $('#btnBack').attr('hidden');
      }
      else {
        $('#btnBack').removeAttr('hidden');
      }

      offset -= $scope.currentLimit;
      $scope.currentPage--;

      refresh();
    };
    // next page
    $scope.next = function() {
      if ($scope.currentPage >= $scope.totalPages) {
        $('#btnNext').attr('hidden');
      }
      else {
        $('#btnNext').removeAttr('hidden');
      }
      offset += $scope.currentLimit;
      $scope.currentPage++;

      refresh();
    };
    // search function
    $scope.getSearch = function() {
      if ($scope.search === "") {
        return;
      }
      $scope.keyword = encodeURIComponent($scope.search);
      $scope.currentPage = 1;
      offset = 0;

      refresh();
    };
    // get cute animals - default search
    $scope.cuteAnimals = function() {
      $scope.currentPage = 1;
      offset = 0;
      $scope.keyword = "cute+animals";

      refresh();
    };
    // toggle kittens / puppies - toggle button
    $scope.swapAnimals = function() {
      $scope.currentPage = 1;
      offset = 0;
      if ($scope.keyword == 'kittens')
        $scope.keyword = 'puppies';
      else
        $scope.keyword = 'kittens';

      refresh();
    };

    $scope.changeLimit = function(selectedLimit) {
      $scope.currentLimit = selectedLimit;

      refresh();
    }
    // gif popup modal
    $scope.popupModal = function(gifUrl) {
      // add image to modal
      $('.modal img').attr('src', gifUrl);
      $('#gifModal').modal('show');
      // when modal is hidden
      $('#gifModal').on('hidden', function () {
        // remove image when modal is hidden
        $('.modal img').attr('src', '');
      })
    };

    // request new gifs
    var refresh = function() {
      giphyAPIservice.getCuteAnimals($scope.keyword, $scope.currentLimit, offset).success(function (response) {
        $scope.gifs = response.data;
        $scope.totalResults = response.pagination.total_count;
        $scope.totalPages = Math.ceil($scope.totalResults / $scope.currentLimit);
        // check if there is there more than one page
        if ($scope.totalResults <= $scope.currentLimit) {
          $scope.totalPages = 1;
        }
        console.log(response);
      });
    };

    refresh();
});
