/**
 * Created by asus on 28.4.2016 г..
 */
angular.module('issueTrackingSystem.editIssue-controller', [
        'issueTrackingSystem.issue-factory',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.project-factory'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id/edit', {
            templateUrl: 'editIssue/editIssue-view.html',
            controller: 'EditIssueController'
        })
    }])
    .controller('EditIssueController', [
        '$scope',
        '$location',
        '$routeParams',
        '$window',
        'IssueServices',
        'authentication',
        'ProjectServices',
        function EditIssueController($scope, $location, $routeParams, $window, IssueServices, authentication, ProjectServices){
            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUser = success;
                }, function (error) {
                    $window.location.href = '/#/';
                });

            IssueServices.GetIssueById($routeParams.id)
                .then(function (success) {
                    $scope.Issue = success;
                    if(success.Author.Id == $scope.CurrentUser.Id || $scope.CurrentUser.isAdmin){

                    }else{
                        $window.location.href = '/#/issue/' + $routeParams.id;
                    }

                    $scope.Issue.LabelsAsString = $scope.loopData(success.Labels);
                    ProjectServices.GetProjectById($scope.Issue.Project.Id)
                        .then(function (projectSuccess) {
                            $scope.Project = projectSuccess;
                        });
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

            authentication.GetAllUsers()
                .then(function (success) {
                    $scope.Users = success;
                })

            $scope.Edit = function (Issue) {
                var labels = "";
                labels = Issue.LabelsAsString;
                labels = labels.split(", ");

                var newLabels= [];
                for (var index = 0; index < labels.length; index++) {
                    newLabels[index] = { Name: labels[index]};
                }

                var IssueForRequest = {
                    Title: Issue.Title,
                    Description: Issue.Description,
                    DueDate: Issue.DueDate,
                    AssigneeId: Issue.Assignee.Id,
                    PriorityId: Issue.Priority.Id,
                    Labels: []
                };

                for (var index = 0; index < newLabels.length; index++) {
                    IssueForRequest.Labels[index] = newLabels[index];

                }

                IssueServices.EditIssue($routeParams.id, IssueForRequest)
                    .then(function(success) {
                        $location.path('/dashboard/1')
                    })
                    .then(function (success) {

                    }, function (error) {
                        console.log(error);
                    });

            }
        }
    ]);