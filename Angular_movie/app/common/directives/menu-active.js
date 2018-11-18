(function(angular) {
  'use strict';

  angular
    .module('moviecat.directive', [])
    .directive('menuActive', ['$location', function($location) {
      return {
        templateUrl: './common/directives/view.html',
        link: function(scope, element, attribute) {
          scope.location = $location;
          scope.$watch('location.url()', function(newVal) {
            // console.log(newVal);

            // url: /coming_soon/3
            // href: #/coming_soon

            // lis 是一个 jqLite 对象
            var lis = element.find('li');
            for(var i = 0; i < lis.length; i++) {
              var curLi = lis.eq(i);

              // /coming_soon
              var href = curLi.children('a').attr('href').substr(1);
              if(newVal.indexOf(href) > -1) {
                // 给当前li元素的父元素的子元素（所有的li元素）移除类
                curLi.parent().children().removeClass('active');
                curLi.addClass('active');
                break;
              }
            }

            // console.log(element, attribute);
          });
        }
      };
    }]);
})(angular);