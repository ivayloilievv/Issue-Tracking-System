/**
 * Created by asus on 28.4.2016 г..
 */
angular.module('issueTrackingSystem.controllers.addIssue', [
        'issueTrackingSystem.services.issue',
        'issueTrackingSystem.services.auth',
        'issueTrackingSystem.services.project'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id/add-issue', {
            templateUrl: 'app/templates/addIssue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$window',
        'IssueServices',
        'AuthServices',
        'ProjectServices',
        function AddIssueController($scope, $routeParams, $window, IssueServices, AuthServices, ProjectServices) {
            $scope.Issue = {};
            ProjectServices.GetAllProjects()
                .then(function (success) {
                    $scope.Projects = success;
                });

            ProjectServices.GetProjectById($routeParams.id)
                .then(function (success) {
                    $scope.Issue.Project = success;
                    $scope.Issue.Labels = $scope.loopData($scope.Issue.Project.Labels);
                });

            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.Issue.Assignee = success;

                });

            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.Users = success;
                });

            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
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

            $scope.Add = function (Issue) {
                var labels = "";
                labels = Issue.Labels;
                labels = labels.split(", ");

                var newLabels= [];
                for (var index = 0; index < labels.length; index++) {
                    newLabels[index] = { Name: labels[index]};
                }

                var IssueForRequest = {
                    Title: Issue.Title,
                    Description: Issue.Description,
                    DueDate: Issue.DueDate,
                    ProjectId: Issue.Project.Id,
                    AssigneeId: Issue.Assignee.Id,
                    PriorityId: Issue.Priority.Id,
                    Labels: newLabels
                };
                IssueServices.PostIssue(IssueForRequest);
            }
        }
    ]);