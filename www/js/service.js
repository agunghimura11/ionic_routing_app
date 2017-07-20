angular.module('starter.service', ['starter.controllers'])
.service('get_data_service', ['$http','$state', function($http, $state)
{
	var value1;
	var value2;
  	var array = []; 
    this.getArray = function(item1, item2)
    {
    	
      var http = $http({
        url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php', 
        method: "GET",
        params: {start_id: item1, finish_id: item2}
      }).success(function(data){
        console.log('Berhasil', data);
       	array = data; 
      }).error(function(err){
        console.log('gagal',err);
      });

      return array;
    }

    this.save_params = function(item1, item2)
    {
    	value1 = item1;
    	value2 = item2;
    }

    this.get_params1 = function()
    {
    	return value1;
    }

    this.get_params2 = function()
    {
    	return value2;
    }
  
}]);


