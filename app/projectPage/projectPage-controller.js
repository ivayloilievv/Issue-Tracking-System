
'use strict';

angular.module('issueTrackingSystem.projectPage-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.dashboard-controller'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projectPage/project-view.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        '$routeParams',
        '$window',
        'ProjectServices',
        'authentication',
        function ProjectController($scope, $routeParams, $window, ProjectServices, authentication) {


            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                });

            ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
                    console.log(success);
                });

            ProjectServices.GetIssuesByProjectId($routeParams.id)
                .then(function(success){
                    $scope.Issues = success;
                });

            $scope.Redirect = function (location) {
                $window.location.href = location;
            }

            $scope.loopData = function (Data) {
                var result = "";
                if(Data != undefined){
                    Data.forEach(function(element) {
                        result+= element.Name + ', ';
                    }, this);
                }
                result = result.substr(0, result.length-2);
                return result;
            }
        }]
    );


