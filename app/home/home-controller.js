
angular.module('issueTrackingSystem.home', [
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.notify-factory'
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
        'notifyService',
        function($scope, $location, authentication, notifyService){

        $scope.redirect = function redirect() {
            if(!(sessionStorage['AccessToken'] === "undefined")){
                $location.path('/dashboard/1');
            }
        }

        $scope.login = function (user){
            authentication.loginUser(user)
                .then(function(result) {
                    notifyService.showInfo('Login success');
                })
                .then(function(resultUser){
                    if(!(sessionStorage['AccessToken'] === "undefined")){
                        //notifyService.showInfo('Proba');
                        $location.path('/dashboard/1');
                    }
                })
        };

        $scope.register = function (user){
            authentication.registerUser(user)
                .then(function(result) {
                    notifyService.showInfo('Register success');
                })
                .then(function(Resultuser) {
                    user.Username = user.Email;

                    authentication.loginUser(user)
                        .then(function(resultUser){
                            if(!(sessionStorage['AccessToken'] === "undefined")){
                                $location.path('/dashboard/1');
                            }
                        })
                })
                .then(function(success) {
                    authentication.GetCurrentUser()
                        .then(function(success) {
                            console.log(success);
                        })
                })
        };

            function GetCurrentUser() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users/me',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })
                return deferred.promise;
            }

            function GetAllUsers() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })
                return deferred.promise;
            }



            return {
                GetCurrentUser: GetCurrentUser,
                GetAllUsers: GetAllUsers
            }
    }])
