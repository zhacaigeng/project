(function (angular) {
  'use strict';

  angular
    .module('moviecat.coming_soon', [])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/coming_soon/:curPage?', {
          templateUrl: './coming_soon/view.html',
          controller: 'coming_soonController'
        })
    }])
    .controller('coming_soonController', ['$scope', '$routeParams', '$route', 'jsonpSrv', function ($scope, $routeParams, $route, jsonpSrv) {
      // 分页功能:
      // 根据 页数 获取对应的数据
      // 客户端告诉服务器需要第几页的数据, 再根据每页大小, 服务器就知道返回那些数据了

      // 豆瓣API需要 起始索引 以及 每页大小 参数, 就能实现分页功能

      // 第一页: 0 1 2 3 4 
      // 第二页: 5 6 7 8 9
      // 第三页: 10 11 12 13 14

      // 第1页对应的起始索引为: 0
      // 第2页对应的起始索引为: 5
      // 第3页对应的起始索引为: 10

      // 起始索引: (page - 1) * pageSize
      // page 表示第几页
      // pageSize 表示每页大小

      // 每页大小(展示数据条数): 5
      var PAGESIZE = 5,     // 常量一般使用大写字母表示（常量表示这个值不会发生变化）
        page = 0;
      
      // 通过路由参数获取当前页码
      page = $routeParams.curPage || 1;

      // 将 当前页码 暴露给视图
      $scope.page = page;

      $scope.goPage = function(page) {
        // 页码边界的检验
        if(page < 1 || page > $scope.totalPage) {
          return;
        }
        // console.log(curPage);

        // 通过 js 代码修改路由参数的值
        // 参数是一个对象，对象的键是 路由参数，键的值是 要跳转的页码
        $route.updateParams({curPage: page});
      };

      var url = 'https://api.douban.com/v2/movie/coming_soon';
      jsonpSrv.jsonp(url, {
        start: (page - 1) * PAGESIZE,
        count: PAGESIZE
      }, function ( data ) {
        console.log(data);
        $scope.data = data;

        $scope.totalPage = Math.ceil(data.total / PAGESIZE);

        // 手动触发angular的脏检查机制，将数据的变化映射到页面中
        $scope.$apply();
      });

      // 简单的GET请求示例:
      // $http({
      //   // 请求类型: 类似与 ajax 的type
      //   method: 'GET',
      //   // 请求地址
      //   url: './in_theaters/data.json'
      // });

      // $http.get('./in_theaters/data.json')
      //   .then(function successCallback(response) {
      //     // 成功的回调函数 response 就是 ajax请求成功的返回值
      //     // response.data 就是我们需要的数据
      //     console.log(response);

      //     $scope.data = response.data;

      //   }, function errorCallback(response) {
      //     // 失败的回调函数
      //     console.log(response);
      //   });

      // 回调地狱
      /* $.ajax({
        url: '',
        success: function () {
          $.ajax({
            url: '',
            success: function () {

            }
          });
        }
      }); */


    }]);

})(angular);