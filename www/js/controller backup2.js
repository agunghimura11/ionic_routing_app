
angular.module('starter.controllers', [])

.controller('MapCtrl', ['$scope', '$http', '$state', '$ionicModal', 'get_data_service', function($scope, $http, $state, $ionicModal, get_data_service) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


$http.get('http://arisudana.xyz/dijkstra/map/data.json').success(function(data){
    
      $scope.node = data.node;
     
      
      $scope.airplaneMode = false;
      //console.log('id', $scope.airplaneMode);
});
console.log('params',$state.params.aId);
$scope.whichartist = $state.params.aId;
var map;
 var markers = [];

function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -8.619379, lng: 115.210772}, 
        zoom: 10
      });
    }
$scope.mapCreated = function(map) {
  $scope.map = map;
};

var markers = [];
$scope.removeMarker = function()
{
   for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    directionsDisplay.setMap(null);
  }
$scope.getValue = function(item, item2)
{
  
  get_data_service.save_params(item, item2);
  

  $scope.item = item; // node awal
  angular.forEach($scope.location, function(value, key) {
    if ($scope.item === value.id) {
        $scope.latitude = value.lat;
        $scope.longitude = value.long;
    }
  });

  //set posisi center dari maps adalah node awal
  var myLatLng =  new google.maps.LatLng(-8.638939, 115.207532);

  $scope.map.setCenter(myLatLng);
  $scope.item2 = item2; // node akhir
  
  $http({
    url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php',
    //url: 'http://localhost/ci2/index.php/pso_get', 
    method: "GET",
    params: {start_id: $scope.item, finish_id: $scope.item2}
  }).success(function(data){
    console.log('Berhasil', data);
    console.log('data peta',data);
         GetLocation(data);
  }).error(function(err){
    console.log('gagal',err);
  });
}  

$scope.TrafficLayerON = function()
{
  if ($scope.airplaneMode == false) {
              $scope.airplaneMode = true;
          } else
              $scope.airplaneMode = false;

  if ($scope.airplaneMode == true) {
    $scope.trafficLayer = new google.maps.TrafficLayer(); 
    $scope.trafficLayer.setMap($scope.map);
  }
  else
  {
    $scope.trafficLayer.setMap(null);
  } 
  console.log('gas');
}

function GetLocation(item)
{
  var a = 0;
  $scope.item = item;
  $scope.lat_t = [];
  $scope.long_t = [];

  console.log('Get Location Success');
  angular.forEach($scope.location, function(value, item){
    angular.forEach($scope.item, function(value2, item2){
        if (String(value2[a]) === value.id) {
           $scope.lat_t.push(value.lat);
           $scope.long_t.push(value.long);
           //AddMarker(value.lat, value.long);
           a = a + 1;
        }
     })
    
  });
  AddLine($scope.lat_t, $scope.long_t);
  
}
function AddMarker(lat, long)
{
  $scope.marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, long),
      map: $scope.map,
      title: 'Holas!'
  }, function(err) {
      console.err(err);
  });
  markers.push($scope.marker);
  
}



function AddLine(lat, long)
{
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var result = lat.map(function (x) { 
      return parseFloat(x, 10); 
  });
  var result2 = long.map(function (x) { 
      return parseFloat(x, 10); 
  });

  directionsDisplay.setMap(map);
  var request = {
      travelMode: google.maps.TravelMode.DRIVING
  };

  for(i = 0; i < result.length; i++)
  {
   AddMarker(result[i], result2[i]);
    
    if (i == 0)
    {
      request.origin = {lat:result[i], lng:result2[i]};
    }
     else if (i == result.length - 1) {
      request.destination = {lat:result[i], lng:result2[i]};
     }
     else {
      if (!request.waypoints) request.waypoints = [];
      request.waypoints.push({
        location: {lat:result[i], lng:result2[i]},
        stopover: true
      });
    }    
  }
  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }); 
  
}



  

}])
//angular.module('second.controllers', [])
.controller('Get_data', ['$scope', '$http', '$state', '$ionicModal', 'get_data_service', function($scope, $http, $state, $stateParams, get_data_service) {
    // var array = [];
    var data1;
    var data2;
    
    // $scope.loca = get_data_service.getArray(1, 2);
    $scope.go = function()
    {
        
        var data = get_data_service.get_params1();
        var data2 = get_data_service.get_params2();
        console.log('data1',data);
        console.log('data2',data2);
        item1 = get_data_service.get_params1();
        item2 = get_data_service.get_params2();
    //   console.log('success');
    //   $scope.hex = get_data_service.getArray(item1, item2);
    //   console.log($scope.hex);
    //   array = $scope.hex;
    //   var result = { data:$scope.hex };
    //   $state.go('tabs.route', result);

    // }
    // var res = $http.post('http://endpoint:8080/search',{"language":"en"})
    //         .success(function(data) {
    //             alert("Search OK");
    //             //take the data.results and make sure its available when I move to tab.search-results
    //             $state.go('tabs.search-results', {result: data});
    //         }).error(function(data) {
    //             alert("Search Bad");
    //         });
    
    $state.go('tabs.route');
    $http({
        url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php', 
        method: "GET",
        params: {start_id: item1, finish_id: item2}
      }).success(function(data){
        //console.log('Berhasil', data);
        var hasil = JSON.parse("[" + data + "]");
        $state.go('tabs.route', { result : hasil });
        //$scope.loca = data; 
      }).error(function(err){
        console.log('gagal',err);
      });
   }
   
   // $http({
   //      url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php', 
   //      method: "GET",
   //      params: {start_id: $scope.item1, finish_id: $scope.item2}
   //    }).success(function(data){
   //      console.log('Berhasil', data);
   //      $state.go('tabs.route');
   //      $scope.loca = data; 
   //    }).error(function(err){
   //      console.log('gagal',err);
   //    });
}])
.controller('View_edge', ['$http', '$scope', function($http, $scope){

  console.log('berhasil');
  $http.get('http://arisudana.xyz/ci2/dijkstra/load').success(function(data){
      $scope.edge = data;
  });

}])
angular.module('third.controllers', [])
.controller('Hasil_data', ['$scope', '$http','$state', '$stateParams', 'get_data_service', function($scope, $http, $state, $stateParams, get_data_service) {
    
  var hasil = JSON.parse("[" + $stateParams.result + "]")
  $scope.loca = [];
  $http.get('http://arisudana.xyz/dijkstra/map/data.json').success(function(data){
     for (var i = 0; i < data.node.length; i++){
      
      for (var j = 0; j < $stateParams.result.length; j++) {
        if (data.node[i].id == hasil[j]) {
          //console.log('data1: ',data.node[i].id);
             //console.log('data: ',data.node[i]);
             $scope.loca[j] = data.node[i];
         }
         
      }
          
      }
     // console.log($scope.loca);
  });
      

     // $scope.loca = $stateParams.result;

}]);
