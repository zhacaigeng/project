(function (angular) {
  "use strict";

  // start your ride
  angular
    .module('moviecat', [
      'ngRoute',
      'moviecat.home_page',
      'moviecat.details',
      'moviecat.movielist',
      'moviecat.search',
      'moviecat.jsonp',
      'moviecat.directive'
    ]);

})(angular);