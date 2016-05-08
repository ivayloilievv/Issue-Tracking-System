
'use strict';

angular.module('issueTrackingSystem.projectPage-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.users.authentication',
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/add', {
            templateUrl: 'projectPage/projectPage-view.html',
            controller: 'AddProjectController'
        })
    }])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'ProjectServices',
        'authentication',
        'notifyService',
        function ProjectController($scope, $location, ProjectServices, authentication, notifyService) {
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
                        notifyService.showInfo('Project created');
                    }, function (error) {
                        console.log(error);
                        notifyService.showError(error.data.Message);
                    })
                    .then(function(success) {
                        $location.path('/dashboard/1')
                    });
            }


    }]);


