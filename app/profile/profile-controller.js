/**
 * Created by asus on 28.4.2016 г..
 */
'use strict';

angular.module('issueTrackingSystem.controllers.profile', [
        'issueTrackingSystem.services.auth'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/templates/changePassword.html',
            controller: 'ProfileController'
        })
    }])
    .controller('ProfileController', [
        '$scope',
        'AuthServices',
        function ProfileController($scope, AuthServices) {
            $scope.ChangePassword = function(User){
                console.log(User);
                AuthServices.ChangePassword(User)
                    .then(function (success) {
                        notify('You have changed the password.');
                        $location.path('/dashboard/1');
                    }, function (error) {
                        notify(error.data.error_description);
                    });
            }
        }
    ]);

angular.module('issueTrackingSystem.controllers.logout', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'app/templates/blank.html'
        })
    }])
    .controller('LogoutController', [
        '$window',
        'notify',
        function LogoutController($window, notify) {
            $window.location.href = '/#/';
            sessionStorage.clear();
            notify('You have logged off.')
        }
    ])