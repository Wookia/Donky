
angular.module('reposList', []).controller('reposListController', function ListOfReposController($scope, $http, $stateParams){
        $scope.error = false;
        $http({
          method: 'GET',
          url: 'https://api.github.com/orgs/Donky-Network/repos'
        }).then(function successCallback(response) {
            $scope.repos = [];
            angular.forEach(response.data, function(singleRepo, key){
                $scope.repos.push({
                    id: singleRepo.id,
                    name: singleRepo.name,
                    language: singleRepo.language,
                    url: singleRepo.svn_url,
                    apiUrl: singleRepo.url
                });
            });
          }, function errorCallback(response) {
              $scope.isError = true;
              $scope.message = 'Cannot get access to github api';
          });
        
})

