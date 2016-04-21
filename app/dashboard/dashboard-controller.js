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
        function DashboardController($scope){

        }
    ])


