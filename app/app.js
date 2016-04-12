'use strict';

angular.module('socialNetwork', [
    'ngRoute',
    'socialNetwork.home',
    'socialNetwork.newsFeed',
    'socialNetwork.common',
    'socialNetwork.users.identity'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');
