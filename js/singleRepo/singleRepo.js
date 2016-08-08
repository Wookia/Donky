
angular.module('singleRepo', []).controller('singleRepoController', function SingleRepoController($rootScope, $scope, $state, $http){
       $scope.repoName = $state.params.repoName;
       $scope.state = $state.current.name;
       var coreCommitUrl = 'https://api.github.com/repos/Donky-Network/'+$scope.repoName+'/commits';
       var coreReleaseUrl = 'https://api.github.com/repos/Donky-Network/'+$scope.repoName+'/releases';
       var commitUrl = coreCommitUrl;
       var releaseUrl = coreReleaseUrl;
       $scope.getCommits = function(){
        if($scope.oAuth && $scope.oAuth.length) commitUrl = coreCommitUrl + '?access_token=' + $scope.oAuth;
        else commitUrl = coreCommitUrl;
          $http({
          method: 'GET',
          url: commitUrl
        }).then(function successCallback(response) {
            $scope.commitsData = [];
            angular.forEach(response.data, function(singleCommit, key){
                var date = new Date(singleCommit.commit.committer.date);
                if(singleCommit.author === null )var avatar = '../images/defaultAvatar.png';
                else var avatar = singleCommit.author.avatar_url;
                $scope.commitsData.push({
                    publishDate: date.toUTCString(),
                    authorName: singleCommit.commit.author.name,
                    avatar: avatar,
                    comment: singleCommit.commit.message
                });
            });
          }, function errorCallback(response) {
              $scope.displayMessage('Cannot get access to github api due to: ' + response.status + ' ' + response.statusText);
          }); 
       };
       $scope.getReleases = function (){
        if($scope.oAuth && $scope.oAuth.length) releaseUrl = coreReleaseUrl + '?access_token=' + $scope.oAuth;
        else releaseUrl = coreReleaseUrl;
           $http({
          method: 'GET',
          url: releaseUrl
        }).then(function successCallback(response) {
            $scope.releasesData = [];
            angular.forEach(response.data, function(singleRelease, key){
                var date = new Date(singleRelease.published_at);
                if(singleRelease.author === null )var avatar = '../images/defaultAvatar.png';
                else var avatar = singleRelease.author.avatar_url;
                $scope.releasesData.push({
                    name: singleRelease.name,
                    tag: singleRelease.tag_name,
                    authorName: singleRelease.author.login,
                    avatar: avatar,
                    publishDate: date.toUTCString(),
                    link: singleRelease.html_url
                });
            });
          }, function errorCallback(response) {
              $scope.displayMessage('Cannot get access to github api due to: ' + response.status + ' ' + response.statusText);
          });
       };
       $scope.doUpdate = function(){  
        if($state.current.name === 'single.commits' && angular.isUndefined($scope.commitsData)){
            $scope.getCommits();
        }
        if($state.current.name === 'single.releases' && angular.isUndefined($scope.releasesData)){
            $scope.getReleases();
        }
        $scope.state = $state.current.name;
       }
       $scope.doUpdate();
       $rootScope.$on('$stateChangeSuccess', 
            function(event, toState, toParams, fromState, fromParams){ 
                $scope.doUpdate();
        });
})
