(function(angular) {
  'use strict';

  angular
    .module('moviecat.search', [])
    .controller('SearchController', ['$scope', '$location', function($scope, $location) {
      $scope.searchText = '';

      $scope.search = function() {
        if($scope.searchText.trim() === '') {
          return;
        }

        // 通过 url 方法更新整个路由
        // url() 方法用来处理URL中的 锚点值
        // 没有参数表示: 获取url锚点值
        // 有参数表示:   设置url锚点值
        // 当 锚点值 发生变化以后, angular中的路由机制就会启动, 所有路由规则就会重新被匹配
        // 当 /:movieType/:curPage? 匹配了当前url以后, 对应的控制器代码就会执行
        $location.url('/search?q=' + $scope.searchText);
      };
    }]);

})(angular);