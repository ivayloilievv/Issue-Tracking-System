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
        function LogoutController($location, $scope) {

            $scope.logout = function logout(){
                sessionStorage['AccessToken'] = undefined;
                $location.path('/home');
            }
    }]);
