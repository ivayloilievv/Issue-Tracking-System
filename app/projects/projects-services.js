
angular.module('issueTrackingSystem.project-factory', [])
    .factory('ProjectServices', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function GetAllProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            function GetProjectById(Id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + Id,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            function GetIssuesByProjectId(Id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + Id + '/Issues',
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }

            function EditProjectById(Id, Data) {

                $http.put(BASE_URL + 'Projects/' + Id, Data,
                    { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                    .then(function (result) {
                        deferred.resolve(result.data);
                    },function (err) {
                        deferred.reject(err);
                    })

                return deferred.promise;
            }



            return {
                GetAllProjects: GetAllProjects,
                GetProjectById: GetProjectById,
                GetIssuesByProjectId: GetIssuesByProjectId,
                EditProjectById: EditProjectById
            }
        }
    ]);