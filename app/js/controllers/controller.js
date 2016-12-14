var appControllers = angular.module('appControllers', ['jsonService']);

appControllers.controller('mainCtrl', [ '$scope', 'jsonService',
    function ($scope, jsonService) {
       $scope.books = [];
        jsonService.query({},
            function(data){
            	// passes the data from the JSON service to angular to be use in the index.html.
                $scope.books = Object.values(data.worksById);
            }
        );

}]);

