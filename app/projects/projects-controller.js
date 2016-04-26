
'use strict';

angular.module('issueTrackingSystem.allProjects-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.dashboard-controller'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects', {
            templateUrl: 'projects/allProject-view.html',
            controller: 'AllProjectsController'
        })
    }])
    .controller('AllProjectsController', [
        '$scope',
        '$location',
        '$routeParams',
        '$window',
        'ProjectServices',
        'authentication',
        function AllProjectsController($scope, $location, $routeParams, $window, ProjectServices, authentication) {
            $scope.RedirectToProjectPage = function redirect(){
                $location.path('/projects/:id');
            }


        }]);