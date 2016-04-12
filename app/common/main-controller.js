
angular.module('socialNetwork.common', [
    'socialNetwork.users.identity'
    ])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        function($scope, identity) {
            $scope.isAuthenticated = identity.isAuthenticated();
    }]);
