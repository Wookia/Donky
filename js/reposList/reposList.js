
angular.module('reposList', []).controller('reposListController', function ListOfReposController($scope, $http, $stateParams){
        var coreUrl = 'https://api.github.com/orgs/Donky-Network/repos';
        var reposUrl = coreUrl;
        $scope.doUpdate = function (){
            if($scope.oAuth && $scope.oAuth.length) reposUrl = coreUrl + '?access_token=' + $scope.oAuth;
            else reposUrl = coreUrl;
            $http({
            method: 'GET',
            url: reposUrl
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
              $scope.displayMessage('Cannot get access to github api due to: ' + response.status + ' ' + response.statusText);
            });
        };
        $scope.doUpdate();
        
})

