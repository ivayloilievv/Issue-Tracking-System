
angular.module('issueTrackingSystem.editProject-controller', [
        'issueTrackingSystem.project-factory',
        'issueTrackingSystem.issue-factory',
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id/edit', {
            templateUrl: 'editProject/editProjects-view.html',
            controller: 'EditProjectController'
        })
    }])
    .controller('EditProjectController', [
        '$scope',
        '$location',
        '$routeParams',
        '$window',
        'ProjectServices',
        'IssueServices',
        'authentication',
        function EditProjectController($scope, $location, $routeParams, $window, ProjectServices, IssueServices, authentication){
            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                });

            authentication.GetAllUsers()
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
                    .then(function(success) {
                        $location.path('/dashboard/1')
                    })
                    .then(function (params) {

                    }, function (error) {
                        console.log(error);
                    });
            }

        }
    ])