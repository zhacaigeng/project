(function (angular) {
  'use strict';
  // /top250/:curPage?
  // /in_theaters/:curPage?
  // /coming_soon/:curPage?

  // /details/123123

  // /search?q=成龙

  // /:movieType/:curPage?

  angular
    .module('moviecat.movielist', [])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/:movieType/:curPage?', {
          templateUrl: './movielist/view.html',
          controller: 'MovielistController'
        })
    }])
    .controller('MovielistController', ['$scope', '$routeParams', '$route', 'jsonpSrv', function ($scope, $routeParams, $route, jsonpSrv) {
      console.log($routeParams);
      $scope.isLoading = true;

      // 每页大小(展示数据条数): 5
      var PAGESIZE = 5,     // 常量一般使用大写字母表示（常量表示这个值不会发生变化）
        page = 0;

      // 通过路由参数获取当前页码
      page = $routeParams.curPage || 1;

      // 将 当前页码 暴露给视图
      $scope.page = page;

      $scope.goPage = function (page) {
        // 页码边界的检验
        if (page < 1 || page > $scope.totalPage) {
          return;
        }
        // console.log(curPage);

        // 通过 js 代码修改路由参数的值
        // 参数是一个对象，对象的键是 路由参数，键的值是 要跳转的页码
        $route.updateParams({ curPage: page });
      };

      var paramsobj = {
        start: (page - 1) * PAGESIZE,
        count: PAGESIZE,
      };

      // 如果是 搜索功能，那就拼接 q 参数，否则不处理！！！
      if ($routeParams.movieType === 'search') {
        // $routParams 能够获取到url中的 参数（跟在?后面的键值 q=成龙 ）
        paramsobj.q = $routeParams.q;
      }

      // https://api.douban.com/v2/movie/search?start=0&count=5&q=%E6%88%90%E9%BE%99&callback=itcast_1500623967017
      var url = 'https://api.douban.com/v2/movie/' + $routeParams.movieType;
      jsonpSrv.jsonp(url, paramsobj, function (data) {
        console.log(data);
        $scope.data = data;

        $scope.totalPage = Math.ceil(data.total / PAGESIZE);
        
        // 关闭加载层
        $scope.isLoading = false;

        // 手动触发angular的脏检查机制，将数据的变化映射到页面中
        $scope.$apply();
      });

    }]);

})(angular);