angular.module('issueTrackingSystem.logout-controller', [])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/logout', {
            templateUrl: 'logout/logout-view.html',
            controller: 'LogoutController'
        })
    }])
    .controller('LogoutController', [
        '$location',
        '$scope',
        'notifyService',
        function LogoutController($location, $scope, notifyService) {

            $scope.logout = function logout(){
                notifyService.showInfo('Logout success')
                sessionStorage['AccessToken'] = undefined;
                $location.path('/home');
            }
    }]);
