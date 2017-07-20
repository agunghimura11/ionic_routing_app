angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-8.637825, 115.210838), 
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
        
        
        
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }
      

      if (document.readyState === "complete") {
        initialize();
        //addMarker();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

    }
  }
})
.directive('street', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        
        var berkeley = {lat: -8.6720963, lng: 115.2337639};

        var sv = new google.maps.StreetViewService();

        var panorama = new google.maps.StreetViewPanorama($element[0]);

        sv.getPanorama({location: berkeley, radius: 50}, processSVData);
        
         function processSVData(data, status){
          
            panorama.setPano(data.location.pano);
            panorama.setPov({
              heading: 270,
              pitch: 0
            });
            panorama.setVisible(true);
         }
        


        $scope.onCreate({street: sv});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
        
      }

      if (document.readyState === "complete") {
        initialize();
        //addMarker();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

    }
  }
});
