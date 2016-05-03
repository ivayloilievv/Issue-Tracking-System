
'use strict';

angular.module('issueTrackingSystem.allProjects-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication'
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
        'ProjectServices',
        'authentication',
        function AllProjectsController($scope, $location, ProjectServices, authentication) {

            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUser = success;
                    if(!success.isAdmin){
                       // $location.path('/dashboard');
                    }
                });

            ProjectServices.GetAllProjects()
                .then(function (success) {
                    $scope.Projects = success;
                    console.log($scope.Projects);
                });

            $scope.Redirect = function (loc) {
                $location.path(loc);
            }

        }]);
