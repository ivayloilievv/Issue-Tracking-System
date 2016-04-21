
angular.module('issueTrackingSystem.common', [
    'issueTrackingSystem.users.identity'
    ])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        function($scope, identity) {
            $scope.isAuthenticated = identity.isAuthenticated();
    }]);
