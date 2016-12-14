var jsonService = angular.module('jsonService', ['ngResource'])
    .factory('jsonService', function ($resource) {
 			return $resource('../../data/ELSIO-Graph-Example.json', {}, {
         	   query: {method:'GET'}
        });
    });