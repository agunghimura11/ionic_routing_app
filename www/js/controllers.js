
angular.module('starter.controllers', [])

.controller('MapCtrl', ['$scope', '$http', '$state', '$ionicModal', 'get_data_service', '$ionicLoading', "$rootScope", "$ionicPopup" ,function($scope, $http, $state, $ionicModal, get_data_service, $ionicLoading, $rootScope, $ionicPopup) {
// ionic.Platform.ready(function() {
//     // hide the status bar using the StatusBar plugin
//     StatusBar.hide();
//   });
$http.get('http://arisudana.web.id/ci2/dijkstra/data').success(function(data){
// $http.get('http://localhost/json/data.json').success(function(data){

      $scope.location = data;
      console.log('data: ',$scope.location);
      
});

$scope.show = function() {
  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
};

$scope.hide = function(){
      $ionicLoading.hide();
};   
$scope.showPopup = function(string) {
    $scope.data = {}
  
    // Custom popup
    var myPopup = $ionicPopup.show({
       
       title: 'Peringatan!',
       subTitle: "Persimpangan Awal atau Akhir Tidak Boleh Kosong!",
       scope: $scope,
    
       buttons: [
          { text: 'OK' }
       ]
    });

    myPopup.then(function(res) {
       console.log('Tapped!', res);
    });    
 };
  $scope.airplaneMode = false;
  $scope.TrafficLayerON = function()
  {

    
    $scope.trafficLayer.setMap($scope.map);
    $scope.mapCreated($scope.map);
    // $scope.trafficLayer = new google.maps.TrafficLayer(); 
      
    //   $scope.trafficLayer.setMap($scope.map);
    // alert($scope.airplaneMode);
    if ($scope.airplaneMode == false) {
        $scope.airplaneMode = true;
    } else
        $scope.airplaneMode = false;

    // if ($scope.airplaneMode == true) {
       
    // }
    // else
    // {
    //   $scope.trafficLayer.setMap(null);
    // } 
    // console.log('gas');
  }
  console.log('params',$state.params.aId);
  $scope.whichartist = $state.params.aId;
  $scope.trafficLayer = new google.maps.TrafficLayer(); 
  $scope.mapCreated = function(map) {
    
    $scope.map = map;
    if ($scope.airplaneMode == true) {
        $scope.trafficLayer.setMap($scope.map);
    }

  };
   
  $scope.go = function(Value, Value2)
  {

    if (Value == null || Value2 == null) {
      $scope.showPopup();
    }
    else
    {
      
      $state.go('tabs.route');
      $http({
          url: 'http://arisudana.web.id/ci2/get_mobile',
          //url: 'http://localhost/ci2/get_dijkstra/get', 
          method: "GET",
          params: {start_id: Value, finish_id: Value2}
        }).success(function(data){
          //console.log('Berhasil', data);

          var hasil = JSON.parse("[" + data + "]");
          $state.go('tabs.route', { result : hasil });
          //$scope.loca = data; 
        }).error(function(err){
          console.log('gagal',err);
        });
    }
      
 }
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
    var string = "";
    if (!item2 && !item) {
      string = "Persimpangan Awal dan Akhir";
      $scope.showPopup(string);
    }
    else if (!item) {
      string = "Persimpangan Awal";
      $scope.showPopup(string);
    }
    else if(!item2)
    {
      string = "Persimpangan Akhir";
      $scope.showPopup(string);
    }

    else
    {
      $scope.show($ionicLoading);
     
      $scope.removeMarker();
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
        //url: 'http://localhost/ci2/get_pso3', 
        url:"http://arisudana.web.id/ci2/get_mobile",
        method: "GET",
        params: {start_id: $scope.item, finish_id: $scope.item2}
      }).success(function(data){
        console.log('Berhasil', data);
        GetLocation(data);
        
      }).error(function(err){
        console.log('woey error gagal',err);
        alert(err);
      }).finally(function($ionicLoading) { 
        // On both cases hide the loading
      $scope.hide($ionicLoading);  
    });
  }
  }
 

  function GetLocation(item)
  {

    var a = 0;
    $scope.item = item;
    $scope.lat_t = [];
    $scope.long_t = [];
    $scope.name = [];
    $scope.id = [];
    console.log('Get Location Success');
    angular.forEach($scope.location, function(value, key){
        for (var i = 0; i < item[0].length; i++) {
          
          if (String(item[0][i]) === value.node_id) {
             $scope.lat_t.push(value.ltd);
             $scope.long_t.push(value.lgd);
              $scope.name.push(value.node_label);
              $scope.id.push(value.node_id);
          }
        }
    });
    AddLine($scope.lat_t, $scope.long_t, $scope.name, $scope.id);
    
  }

  function AddMarker(lat, long, color, name, id)
  {
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<p><b>ID</b> :' +id+
      '<p><b>Nama Persimpangan</b> :' +name+
      '</p><p><b>Latitude</b>          :' +lat+
      '</p><p><b>Longitute</b>     :' +long+
      '</p></div>'+
      '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    if (color == 'BLUE') {
      var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
    else if (color == 'RED') {
      var image = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
    else
    {
      var image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    }

    $scope.marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, long),
        map: $scope.map,
        icon: image,
        title: 'Holas!'
    }, function(err) {
        console.err(err);
    });
    $scope.marker.addListener('click', function() {
          infowindow.open($scope.map, $scope.marker);
    });

    markers.push($scope.marker);
    
  }

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  //var directionsDisplay = new google.maps.DirectionsRenderer;
  var marker_colour = 'RED';
  function AddLine(lat, long, name, id)
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
         
        if (i == 0)
        {
          request.origin = {lat:result[i], lng:result2[i]};
          marker_colour = 'RED';
        }
         else if (i == result.length - 1) {
          request.destination = {lat:result[i], lng:result2[i]};
          marker_colour = 'GREEN';
         }
         else {
          marker_colour = 'BLUE';
          if (!request.waypoints) request.waypoints = [];
          request.waypoints.push({
            location: {lat:result[i], lng:result2[i]},
            stopover: true
          });
        } 

        AddMarker(result[i], result2[i], marker_colour, name[i], id[i]); 
      }
      directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }); 
      
    }


}]);
angular.module('second.controllers', [])
.controller('Get_data', ['$scope', '$http', '$state', '$ionicModal', 'get_data_service', '$ionicLoading', "$rootScope", "$ionicPopup" ,function($scope, $http, $state, $ionicModal, get_data_service, $ionicLoading, $rootScope, $ionicPopup) {
    
    var data1;
    var data2;
      $scope.showPopup = function() {
        $scope.data = {}
      
        // Custom popup
        var myPopup = $ionicPopup.show({
           
           title: 'Peringatan!',
           subTitle: "Belum memilih persimpangan awal dan akhir!",
           scope: $scope,
        
           buttons: [
              { text: 'OK' }
           ]
        });

        myPopup.then(function(res) {
           console.log('Tapped!', res);
        });    
     };
   // untuk menghilangkan tombol
   console.log('data gess: ',get_data_service.get_params1());

    $scope.go = function()
    {
      alert('jostt');
      if (get_data_service.get_params1() == null) {
        $scope.showPopup();
      }
      else
      {
        var data = get_data_service.get_params1();
        var data2 = get_data_service.get_params2();
        console.log('data1',data);
        console.log('data2',data2);
        item1 = get_data_service.get_params1();
        item2 = get_data_service.get_params2();
        $state.go('tabs.route');
        $http({
            url: 'http://arisudana.web.id/ci2/get_pso3', 
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
        
   }
}])
.controller('View_edge', ['$http', '$scope', function($http, $scope){

  
  $http.get('http://arisudana.web.id/ci2/dijkstra/load3').success(function(data){
      $scope.edge = data;
      console.log($scope.edge);
  });


}])
.controller('View_wilayah', ['$http', '$scope', function($http, $scope){

  
  $http.get('http://arisudana.web.id/ci2/dijkstra/load2').success(function(data){
      $scope.wilayah = data;
      console.log($scope.wilayah);
  });


}])
angular.module('third.controllers', [])
.controller('Hasil_data', ['$scope', '$http','$state', '$stateParams', 'get_data_service', "$ionicLoading", function($scope, $http, $state, $stateParams, get_data_service, $ionicLoading) {
  
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

  $scope.num = 0;
  var hasil = JSON.parse("[" + $stateParams.result + "]")
  $scope.loca = [];
  $http.get('http://arisudana.web.id/ci2/dijkstra/data').success(function(data){
     
     $scope.show($ionicLoading);
     for (var i = 0; i < data.length; i++){
        for (var j = 0; j < $stateParams.result.length; j++) {
          if (data[i].node_id == hasil[j]) {
               $scope.loca[j] = data[i];
           }      
        }
      }
    }).error(function(error){
      alert('error');
    }).finally(function($ionicLoading){
    $scope.hide($ionicLoading);  
  });
  
}])
.controller('Street_view', ['$scope', '$http','$state', '$stateParams', 'get_data_service', '$window', function($scope, $http, $state, $stateParams, get_data_service, $window) {
  
  $scope.focusinControl = {};
  // $scope.mapCreated = function(map) {
  //   $scope.map = map;
  // }

  $scope.AddMarker = function()
  {
    var lat = parseFloat($state.params.lat); 
    var lng = parseFloat($state.params.lng);
    var name = $state.params.name;
    
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<p><b>Nama Persimpangan</b> :' +name+
      '</p><p><b>Latitude</b>          :' +lat+
      '</p><p><b>Longitute</b>     :' +lng+
      '</p></div>'+
      '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var mapOptions = {
          center: new google.maps.LatLng(lat, lng), 
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapMarker"), mapOptions);
    
    $scope.marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: 'Node!'
    }, function(err) {
        console.err(err);
    });
    // $scope.marker.addListener('click', function() {
          infowindow.open($scope.map, $scope.marker);
        // });
  }
  $scope.back = function()
  {
     $window.history.back();
  }
  $scope.streetView = function()
  {
    var lat = parseFloat($state.params.lat); 
    var lng = parseFloat($state.params.lng);
    
    var location = {lat: lat, lng: lng};

    var sv = new google.maps.StreetViewService();

    var panorama = new google.maps.StreetViewPanorama(document.getElementById("stretview"));

    sv.getPanorama({location: location, radius: 50}, processSVData);
    
     function processSVData(data, status){
      
        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);
     }
  }
  

}])

