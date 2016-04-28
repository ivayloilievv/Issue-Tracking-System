
angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            function registerUser(user) {
                var deferred = $q.defer();


                $http.post(BASE_URL + 'api/' + 'Account/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    },function(error) {

                    });
                return deferred.promise;
            }

            function  loginUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/' + 'Token', "Username=" + encodeURIComponent(user.Username) +
                        "&password=" + encodeURIComponent(user.Password) +
                        "&grant_type=password",
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                    .then(function(success){
                        sessionStorage['AccessToken'] = success.data.access_token;
                        sessionStorage['CurrentUser'] = success.data.userName;
                        sessionStorage['TokenType'] = success.data.token_type;
                        console.log(sessionStorage.AccessToken);
                        deferred.resolve(success.data);
                    },function (err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function GetCurrentUser() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'users/me',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        console.log(result);
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

            function ChangePassword(User) {

                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', User ,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }


            function  logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                GetCurrentUser: GetCurrentUser,
                GetAllUsers: GetAllUsers,
                ChangePassword: ChangePassword,
                logout: logout
            }
    }])
