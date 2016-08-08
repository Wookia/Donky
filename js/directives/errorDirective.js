angular.module('directive.error', [])
    .directive('error',['$timeout', function ($timeout)
    {
        return {
            restrict: "A",
            replace: true,
            template: '<div class="errorMessage alert alert-danger">' +'{{message}}' + '</div>',
            link: function ($scope, elm, attrs)
            {   
                $scope.$watch('error', function (v)
                {
                    if($scope.error){
                            elm.css('display', 'block');
                            $timeout(function(){
                                    elm.css('display', 'none');
                                    $scope.error = false;
                                }, 5000);
                    }
                
                });
            }
        };

    }]);
