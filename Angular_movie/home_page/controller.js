(function(angular) {
  'use strict';

  angular
    .module('moviecat.home_page', [])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/home_page', {
          templateUrl: './home_page/view.html'
        })
        .otherwise({
          redirectTo: '/home_page'
        });
    }]);

})(angular);