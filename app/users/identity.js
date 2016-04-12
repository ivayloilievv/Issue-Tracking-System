
angular.module('socialNetwork.users.identity', [])
    .factory('identity', [function() {

        var accessToken = ' ';
        var username = 'gosho';

        return {
            getCurrentUser: function() {
                return {
                    username : username
                }
            },
            isAuthenticated: function() {
                return true;
            }
        };

    }]);
