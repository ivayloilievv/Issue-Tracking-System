
'use strict';

angular.module('issueTrackingSystem.controllers.project', [
        'issueTrackingSystem.services.project',
        'issueTrackingSystem.services.auth'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id', {
            templateUrl: 'app/templates/project.html',
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

angular.module('issueTrackingSystem.controllers.editProject', [
        'issueTrackingSystem.services.project',
        'issueTrackingSystem.services.issue',
        'issueTrackingSystem.services.auth'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id/edit', {
            templateUrl: 'app/templates/editProject.html',
            controller: 'EditProjectController'
        })
    }])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$window',
        'ProjectServices',
        'IssueServices',
        'AuthServices',
        function EditProjectController($scope, $routeParams, $window, ProjectServices, IssueServices, AuthServices){
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                });

            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.AllUsers = success;
                });

            ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
                    $scope.Priorities = $scope.loopData(success.Priorities);
                    $scope.Labels = $scope.loopData(success.Labels);
                    if(success.Lead.Id != $scope.CurrentUserId){
                        $window.location.href = '/#/project/' + $routeParams.id;
                    }
                });

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



            $scope.Edit = function (Project, Labels, Priorities) {
                var newProject = {};
                var labels = "";
                var priorities = "";
                priorities = Priorities.split(", ");
                labels = Labels.split(", ");
                var newLabels = [];
                for (var index = 0; index < labels.length; index++) {
                    newLabels[index] = { Name: labels[index]};
                }
                var newPriorities = [];
                for (var index = 0; index < priorities.length; index++) {
                    newPriorities[index] = { Name: priorities[index]};
                }

                newProject.LeadId = Project.Lead.Id;
                newProject.Description = Project.Description;
                newProject.Name = Project.Name;
                newProject.Priorities = newPriorities;
                newProject.Labels = newLabels;
                ProjectServices.EditProjectById($routeParams.id, newProject)
                    .then(function (params) {

                    }, function (error) {
                        console.log(error);
                    });
            }

        }
    ])
