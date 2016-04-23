'use strict';

angular.module('issueTrackingSystem.dashboard-controller', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard-view.html',
            controller: 'DashboardController'
        })
    }])

    .controller('DashboardController', [
        '$scope',
        '$location',
        function DashboardController($scope, $location){
            $scope.redirect = function redirect($location) {
                $location.path('/projects');
            }
        }
    ])

    .controller('DashboardController', [
        '$scope',
        '$routeParams',
        'ProjectServices',
        'IssueServices',
        function DashboardController($scope, $routeParams, ProjectServices, IssueServices) {
            var projectIdArray = [];
            var projects = [];
            $scope.Projects = [];
            ProjectServices.GetAllProjects()
                .then(function (success) {
                    var projects = [];
                    projects = success;
                    projects = projects.filter(isCurrentUsersProject)
                    $scope.Projects = projects;
                    console.log(success);
                });

            function isCurrentUsersProject(element) {
                var result = element.Lead.Username == sessionStorage['CurrentUser'];
                return result;
            }

            IssueServices.GetMyIssues($routeParams.id)
                .then(function(success){
                    $scope.Issues = success;
                    success.Issues.forEach(function(element) {
                        if (projectIdArray.indexOf(element.Project.Id) < 0) {
                            projectIdArray.push(element.Project.Id);
                            ProjectServices.GetProjectById(element.Project.Id)
                                .then(function (project) {
                                    $scope.Projects.push(project);
                                });
                        }
                    }, this);
                });





            $scope.range = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };
        }
    ]);


