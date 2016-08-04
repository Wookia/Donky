angular.module('gitDonkyApp', ['reposList', 'singleRepo', 'directive.loading', 'ui.router']).
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
}]);