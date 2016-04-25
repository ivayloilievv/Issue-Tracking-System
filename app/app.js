'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'issueTrackingSystem.home',
    'issueTrackingSystem.common',
    'issueTrackingSystem.users.identity',
    'issueTrackingSystem.users.authentication',
    'issueTrackingSystem.dashboard-controller',
    'issueTrackingSystem.projects-controller',
    'issueTrackingSystem.editProject-controller',
    'issueTrackingSystem.project-factory',
    'issueTrackingSystem.issue-factory',
    'issueTrackingSystem.issue-controller'

  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');
