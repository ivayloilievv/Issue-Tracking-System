
'use strict';

angular.module('issueTrackingSystem.issue-controller', [
        'issueTrackingSystem.issue-factory',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.project-factory'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id', {
            templateUrl: 'issue/issue-view.html',
            controller: 'IssueController'
        })
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        '$window',
        '$location',
        'IssueServices',
        'authentication',
        'ProjectServices',
        'notifyService',
        function IssueController($scope, $routeParams, $window, $location, IssueServices, authentication, ProjectServices, notifyService){
            IssueServices.GetIssueById($routeParams.id)
                .then(function (success) {
                    $scope.Issue = success;
                    console.log($scope.Issue);
                });

            IssueServices.GetCommentsByIssueId($routeParams.id)
                .then(function (success) {
                    $scope.Comments = success;
                }, function (error) {
                    console.log(error);
                });

            authentication.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                });

            $scope.ChangeStatus = function (StatusId) {
                IssueServices.ChangeStatus($routeParams.id, StatusId)
                    .then(function (success) {
                        notifyService.showInfo('Proba');
                    }, function (error) {
                        console.log(error);
                        console.log(sessionStorage['TokenType']);
                        console.log(sessionStorage['AccessToken']);
                        notifyService.showError(error.data.Message);
                    });
            }

            $scope.AddComment = function (Comment) {
                var obj = {
                    Text: Comment
                }
                IssueServices.AddComment($routeParams.id, obj);
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

            $scope.Redirect = function(loc) {
                $location.path(loc);
            }


        }]
    );

