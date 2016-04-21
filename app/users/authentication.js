
angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            function registerUser(user, success) {
                var deferred = $q.defer();


                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    },function(error) {

                    });

                return deferred.promise;
            }

            function  loginUser(user, success) {
                var deferred = $q.defer();

                console.log(user.Password);
                console.log(user.Username);

                $http.post(BASE_URL + 'Token', "Username=" + encodeURIComponent(user.Username) +
                        "&password=" + encodeURIComponent(user.Password) +
                        "&grant_type=password",
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                    .then(function(success){
                        deferred.resolve(success.data);
                    },function (err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function  logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
    }])
