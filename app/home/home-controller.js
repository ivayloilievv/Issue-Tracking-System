
angular.module('issueTrackingSystem.home', [
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        })

    }])

    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location, authentication){
        $scope.login = function (user){
            authentication.loginUser(user)
                .then(function(loggedInUser) {
                })
        };

        $scope.register = function (user){
            authentication.registerUser(user)
                .then(function(Resultuser) {
                    user.Username = user.Email;

                    authentication.loginUser(user)
                        .then(function(result){
                            console.log(result);
                        })
                })

        };
    }])
