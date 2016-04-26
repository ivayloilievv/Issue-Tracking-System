
'use strict';

angular.module('issueTrackingSystem.projectPage-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.dashboard-controller'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projectPage/projectPage-view.html',
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


            authentication.GetAllUsers()
                .then(function (success) {
                    $scope.AllUsers = success;
                }, function(error){
                    console.log(error);
                })

            $scope.CreateProject = function(Data, Lead){
                var priorities = "";
                priorities = Data.Priorities;
                priorities = priorities.split(", ");

                var newPriorities= [];
                for (var index = 0; index < priorities.length; index++) {
                    newPriorities[index] = { Name: priorities[index]};
                }

                Data.LeadId = Lead.Id;
                Data.Priorities = newPriorities;
                ProjectServices.CreateProject(Data)
                    .then(function (success) {
                        notify('Project created');
                    }, function (error) {
                        console.log(error);
                        notify(error.data.Message);
                    })
            }
        }]
    );


