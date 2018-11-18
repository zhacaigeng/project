(function(angular) {
  'use strict';

  angular
    .module('moviecat.details', [])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/details/:id', {
          templateUrl: './details/view.html',
          controller: 'DetailsController'
        })
    }])
    .controller('DetailsController', ['$scope', '$routeParams', 'jsonpSrv', function($scope, $routeParams, jsonpSrv) {
      
      var id = $routeParams.id;
      var url = 'https://api.douban.com/v2/movie/subject/' + id;
      jsonpSrv.jsonp(url, {}, function(data) {
        $scope.data = data;

        $scope.$apply();
      });

    }]);

})(angular);