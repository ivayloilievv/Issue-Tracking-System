/**
 * Created by asus on 29.4.2016 г..
 */
angular.module('issueTrackingSystem.project-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id', {
            templateUrl: 'singleProjectPage/project-view.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        '$location',
        '$routeParams',
        '$window',
        'ProjectServices',
        'authentication',
        function ProjectController($scope, $location, $routeParams, $window, ProjectServices, authentication) {
            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                }, function (error) {
                    $window.location.href = '/#/';
                });

            ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
                });

            ProjectServices.GetIssuesByProjectId($routeParams.id)
                .then(function(success){
                    $scope.Issues = success;
                });

            $scope.Redirect = function (loc) {
                $location.path(loc);
               // $window.location.href = location;
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