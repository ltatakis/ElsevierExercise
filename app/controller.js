

var appControllers = angular.module('appControllers', ['jsonService']);

appControllers.controller('mainCtrl', [ '$scope', 'jsonService',
    function ($scope, jsonService) {
       $scope.books = [];
        jsonService.query({},
            function(data){
                $scope.books = Object.values(data.worksById);
            }
        );

}]);

