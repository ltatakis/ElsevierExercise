var jsonService = angular.module('jsonService', ['ngResource'])
    .factory('jsonService', function ($resource) {
    	// This url might need changing for deployment
 			return $resource('../../data/ELSIO-Graph-Example.json', {}, {
         	   query: {method:'GET'}
        });
    });