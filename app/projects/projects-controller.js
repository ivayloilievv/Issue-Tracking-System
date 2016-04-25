
'use strict';

angular.module('issueTrackingSystem.projects-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects', {
            templateUrl: 'projects/allProject-view.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        '$routeParams',
        '$window',
        'ProjectServices',
        'AuthServices',
        function ProjectController($scope, $routeParams, $window, ProjectServices, AuthServices) {


            AuthServices.GetCurrentUser()
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


