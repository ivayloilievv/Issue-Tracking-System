
angular.module('issueTrackingSystem.issue-factory', [])
    .factory('IssueServices', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function GetMyIssues(pageId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/me?orderBy=Project.Name desc, IssueKey&pageSize=5&pageNumber=' + pageId,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            function GetIssueById(Id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + Id,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            function PostIssue(Data) {

                $http.post(BASE_URL + 'Issues', Data,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;

            }

            function GetCommentsByIssueId(Id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + Id + '/Comments',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            return {
                GetMyIssues: GetMyIssues,
                PostIssue: PostIssue,
                GetIssueById: GetIssueById,
                GetCommentsByIssueId: GetCommentsByIssueId
            }
        }
    ]);
