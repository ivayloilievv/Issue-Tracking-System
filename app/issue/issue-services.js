
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
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues', Data,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                        console.log(result);
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

            function EditIssue(Id, Data) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + Id, Data,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;

            }


            function ChangeStatus(Id, StatusId) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + Id + '/changestatus?statusid=' + StatusId ,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function AddComment(Id, Comment) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/' + Id + '/Comments', Comment,
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
                EditIssue: EditIssue,
                GetIssueById: GetIssueById,
                GetCommentsByIssueId: GetCommentsByIssueId,
                ChangeStatus: ChangeStatus,
                AddComment: AddComment
            }
        }
    ]);
