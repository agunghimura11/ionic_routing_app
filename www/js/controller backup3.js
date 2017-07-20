
angular.module('starter.controllers', [])

.controller('MapCtrl', ['$scope', '$http', '$state', '$ionicModal', 'get_data_service', function($scope, $http, $state, $ionicModal, get_data_service) {

//$http.get('http://arisudana.xyz/dijkstra/map/data.json').success(function(data){
$http.get('http://localhost/json/data.json').success(function(data){
      
      $scope.location = data;
      console.log('data: ',$scope.location);
      
});

      
  $scope.airplaneMode = false;
  console.log('params',$state.params.aId);
  $scope.whichartist = $state.params.aId;

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
    if (!$scope.map) {
        return;
    }
    
    $scope.item = item; // node awal
    
    //set posisi center dari maps adalah node awal
    var myLatLng =  new google.maps.LatLng(-8.638939, 115.207532);

    $scope.map.setCenter(myLatLng);
    $scope.item2 = item2; // node akhir
    
    $http({
      url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php', 
      method: "GET",
      params: {start_id: $scope.item, finish_id: $scope.item2}
    }).success(function(data){
      console.log('Berhasil', data);
      GetLocation(data);
      
    }).error(function(err){
      console.log('woey error gagal',err);
      alert('gagal');
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
          if (String(value2[a]) === value.node_id) {
             $scope.lat_t.push(value.ltd);
             $scope.long_t.push(value.lgd);
             AddMarker(value.ltd, value.lgd);
             console.log(value.node_id);
          }
          a = a + 1;
          
       })
      
    });
    AddLine($scope.lat_t, $scope.long_t);
    
  }

  //  function GetLocation(item)
  // {
  //   var a = 0;
  //   $scope.item = item;
  //   $scope.lat_t = [];
  //   $scope.long_t = [];

  //   angular.forEach($scope.location, function(value, item){
  //     angular.forEach($scope.item, function(value2, item2){

  //         if (String(value2[a]) === value.node_id) {
  //            // $scope.lat_t.push(value.ltd);
  //            // $scope.long_t.push(value.lgd);
  //            // AddMarker(value.ltd, value.lgd);
  //            a = a + 1;
  //            //console.log(value);
  //            console.log(value2[item]);
  //         }
           
  //      })
      
  //   });
  //   AddLine($scope.lat_t, $scope.long_t);
    
  // }
  function AddMarker(lat, long)
  {
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    $scope.marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, long),
        map: $scope.map,
        title: 'Holas!'
    }, function(err) {
        console.err(err);
    });
    $scope.marker.addListener('click', function() {
          infowindow.open($scope.map, $scope.marker);
        });

    markers.push($scope.marker);
    
  }

  // var directionsService = new google.maps.DirectionsService;
  //   var directionsDisplay = new google.maps.DirectionsRenderer;

  // function AddLine(lat, long)
  // {
  //   var result = lat.map(function (x) { 
  //       return parseFloat(x, 10); 
  //   });
  //   var result2 = long.map(function (x) { 
  //       return parseFloat(x, 10); 
  //   });
   
  //   for(i = 0; i < result.length - 1; i++)
  //   {
        
  //       directionsDisplay.setMap($scope.map);
  //       directionsService.route({
  //       origin:{lat:result[i], lng:result2[i]},
  //       destination: {lat:result[i+1], lng:result2[i+1]},
  //       travelMode: google.maps.TravelMode.DRIVING
  //       }, function(response, status) {
  //         if (status === google.maps.DirectionsStatus.OK) {
  //           directionsDisplay.setDirections(response);
  //         } else {
  //           window.alert('Directions request failed due to ' + status);
  //         }
  //       });  
  //   }
    
  // }
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  function AddLine(lat, long)
    {
      
      
      var result = lat.map(function (x) { 
          return parseFloat(x, 10); 
      });
      var result2 = long.map(function (x) { 
          return parseFloat(x, 10); 
      });
      

      directionsDisplay.setMap($scope.map);
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

// $scope.mapCreated = function(map) {
       
//         $scope.map = map;
//       };

// $scope.getValue = function(item, item2)
// {
  
//   get_data_service.save_params(item, item2);
  

//   $scope.item = item; // node awal
//   angular.forEach($scope.location, function(value, key) {
//     if ($scope.item === value.id) {
//         $scope.latitude = value.lat;
//         $scope.longitude = value.long;
//     }
//   });

//   //set posisi center dari maps adalah node awal
//   var myLatLng =  new google.maps.LatLng(-8.638939, 115.207532);

//   $scope.map.setCenter(myLatLng);
//   $scope.item2 = item2; // node akhir
  
//   $http({
//     url: 'http://arisudana.xyz/dijkstra/Dijkstrajson.php',
//     //url: 'http://localhost/ci2/index.php/pso_get', 
//     method: "GET",
//     params: {start_id: $scope.item, finish_id: $scope.item2}
//   }).success(function(data){
//     console.log('Berhasil', data);
//     console.log('data peta',data);
//          GetLocation(data);
//   }).error(function(err){
//     console.log('gagal',err);
//   });
// }  

// $scope.TrafficLayerON = function()
// {
//   if ($scope.airplaneMode == false) {
//               $scope.airplaneMode = true;
//           } else
//               $scope.airplaneMode = false;

//   if ($scope.airplaneMode == true) {
//     $scope.trafficLayer = new google.maps.TrafficLayer(); 
//     $scope.trafficLayer.setMap($scope.map);
//   }
//   else
//   {
//     $scope.trafficLayer.setMap(null);
//   } 
//   console.log('gas');
// }

// function GetLocation(item)
// {
//   var a = 0;
//   $scope.item = item;
//   $scope.lat_t = [];
//   $scope.long_t = [];

//   console.log('Get Location Success');
//   angular.forEach($scope.location, function(value, item){
//     angular.forEach($scope.item, function(value2, item2){
//         if (String(value2[a]) === value.id) {
//            $scope.lat_t.push(value.lat);
//            $scope.long_t.push(value.long);
//            //AddMarker(value.lat, value.long);
//            a = a + 1;
//         }
//      })
    
//   });
//   AddLine($scope.lat_t, $scope.long_t);
  
// }

// function AddMarker(lat, long)
// {
//   $scope.marker = new google.maps.Marker({
//       animation: google.maps.Animation.DROP,
//       position: new google.maps.LatLng(lat, long),
//       map: $scope.map,
//       title: 'Holas!'
//   }, function(err) {
//       console.err(err);
//   });
//   markers.push($scope.marker);
  
// }

// function AddLine(lat, long)
// {
//   var directionsService = new google.maps.DirectionsService;
//   var directionsDisplay = new google.maps.DirectionsRenderer;

//   var result = lat.map(function (x) { 
//       return parseFloat(x, 10); 
//   });
//   var result2 = long.map(function (x) { 
//       return parseFloat(x, 10); 
//   });

//   directionsDisplay.setMap(map);
//   var request = {
//       travelMode: google.maps.TravelMode.DRIVING
//   };

//   for(i = 0; i < result.length; i++)
//   {
//    AddMarker(result[i], result2[i]);
    
//     if (i == 0)
//     {
//       request.origin = {lat:result[i], lng:result2[i]};
//     }
//      else if (i == result.length - 1) {
//       request.destination = {lat:result[i], lng:result2[i]};
//      }
//      else {
//       if (!request.waypoints) request.waypoints = [];
//       request.waypoints.push({
//         location: {lat:result[i], lng:result2[i]},
//         stopover: true
//       });
//     }    
//   }
//   directionsService.route(request, function(response, status) {
//     if (status === google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   }); 
// }

}]);
angular.module('second.controllers', [])
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
}])
.controller('View_edge', ['$http', '$scope', function($http, $scope){

  
  $http.get('http://localhost/ci2/dijkstra/load3').success(function(data){
      $scope.edge = data;
      console.log($scope.edge);
  });


}])
.controller('View_wilayah', ['$http', '$scope', function($http, $scope){

  
  $http.get('http://localhost/ci2/dijkstra/load2').success(function(data){
      $scope.wilayah = data;
      console.log($scope.wilayah);
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
             $scope.loca[j] = data.node[i];
         }
         
      }
          
      }

  });
}]);
