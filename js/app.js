angular.module('gitDonkyApp', ['reposList', 'singleRepo', 'directive.loading', 'directive.error', 'ui.router', 'ngCookies']).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('repos', {
          url: '/',
          templateUrl: 'templates/repoList/repoListTemplate.html',
          controller: 'reposListController'
        }).state('single', {
          url: '/repo/:repoName',
          controller: 'singleRepoController',
          templateUrl: 'templates/singleRepo/singleRepoTemplate.html'
        }).state('single.commits', {
          url: '/commits',
          views: {
              'repoDetiles' : {templateUrl: 'templates/singleRepo/singleRepoCommits.html'}
          },
          controller: 'singleRepoController'
        }).state('single.releases', {
          url: '/releases',
          views: {
              'repoDetiles' : {templateUrl: 'templates/singleRepo/singleRepoReleases.html'}
          },
          controller: 'singleRepoController'
        });
}]).controller('gitDonkyAppController', function($scope, $cookies){
    $scope.error = false;
    $scope.message = '';
    $scope.displayMessage = function(message){
        $scope.error = true;
        $scope.message = message;
    }
    $scope.saveOAuth = function (){
        $cookies.put('gitOAuth', $scope.oAuth);
    }
    $scope.getOAuth = function (){
        $scope.oAuth = $cookies.get('gitOAuth');
    }
});