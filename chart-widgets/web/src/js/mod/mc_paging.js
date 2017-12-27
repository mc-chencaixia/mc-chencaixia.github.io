var app = angular.module('myApp',[])
        // .value('totalPages', 13)
        .controller('myPage1',  function($scope , $timeout){
            $scope.pages = {'totalPages': 14, 'curPage': 4};
            $timeout( function(){
                $scope.pages.curPage = 8;
            },1000);            
           
        })
        .controller('myPage2',  function($scope , $timeout){
            $scope.pages = {'totalPages': 5, 'curPage': 1};
            $timeout( function(){
                $scope.pages.curPage = 3;
            },800);            
           
        })
        .directive('mcPages', function(){
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: true,
                //scope: {pages : '@'}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
                template: '<ul class="mc_paging">' + 
                              '<li ng-click="prev()"><a href="#">&laquo;</a></li>' +
                              '<li ng-show="pages.curPage>2"><a href="#">1</a></li>' +
                              '<li ng-show="pages.curPage>3"><a href="#">2</a></li>' +
                              '<li class="sl" ng-show="pages.curPage>4"><a href="#">...</a></li>' +
                              '<li ng-show="pages.curPage>1"><a href="#">{{pages.curPage-1}}</a></li>' +
                              '<li class="cur"><a href="#">{{pages.curPage}}</a></li>'+
                              '<li ng-show="pages.curPage<pages.totalPages"><a href="#">{{pages.curPage+1}}</a></li>' +
                              '<li class="sl" ng-show="pages.totalPages-pages.curPage>3"><a href="#">...</a></li>' +
                              '<li ng-show="pages.totalPages-pages.curPage>2"><a href="#">{{pages.totalPages-1}}</a></li>' +
                              '<li ng-show="pages.totalPages-pages.curPage>1"><a href="#">{{pages.totalPages}}</a></li>' +
                              '<li ng-click="next()"><a href="#">&raquo;</a></li>' +
                        '</ul>',
                // templateUrl: 'pagingTemplate.html',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function( $scope, element, iAttrs, controller) {
                    element.on('click', 'li:not(:first, :last, .sl)', function(){
                        if($scope.pages.curPage == parseInt($(this).text())){
                            return;
                        }
                        $scope.pages.curPage = parseInt($(this).text());        // 注意字符串转换为int
                        $scope.$apply();
                    })
                }
            };
        });

