// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-material', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MapCtrl'
  })

  .state('tabs.home', {
    url: "/home",
    views: {
      'home-tab': {
        templateUrl: "templates/home.html",
        controller: 'MapCtrl'
      }
    }
  })
 
  .state('tabs.list', {
    url: "/list",
    views: {
      'list-tab': {
        templateUrl: "templates/list.html",
        controller: 'MapCtrl'
      },
      'fabContent': {
        template: '<button ng-click="go(1,3)" id="fab-profile" class="button button-fab button-fab-bottom-left button-positive"><i class="icon ion-model-s"></i></button>',
        service: function get_data_service() {
            return function() {
              this.getArray = function(item1, item1)
              {
                return item1;
              }
            }
        },
        controller: function Get_data($scope, $http, $state, $stateParams, get_data_service) {
          console.log($stateParams);
            $scope.go = function(item1, item2)
            {

              this.get_data_service.getArray(item1, item2).subscribe((res) => {
                console.log('respond',res);
              }, (error) => {
                console.log('error',error);
              });
              $scope.item = item1;
              $scope.item2 = item2;
              
              // $http({
              //   url: 'http://localhost/dijkstra/Dijkstrajson.php', 
              //   method: "GET",
              //   params: {start_id: $scope.item, finish_id: $scope.item2}
              // }).success(function(data){
              //   console.log('Berhasil', data);
              //   $scope.location = data;
              //   $state.go('tabs.route', {data:$scope.location});
              // }).error(function(err){
              //   console.log('gagal',err);
              // });

            }
            
        }
      }
    }
  })
  
  .state('tabs.calendar', {
      url: "/calendar",
      views: {
        'calendar-tab': {
          templateUrl: "templates/listnode.html",
          controller: 'MapCtrl'
        }
      }
    })
  .state('tabs.route', {
      url: "/route",
      views: {
        'calendar-tab': {
          templateUrl: "templates/rute.html",
          
          controller: function Get_data($scope, $http, $state, $stateParams) {
              console.log('gass',$stateParams);
           }
        }
      }
    })
  .state('tabs.detail', {
    url: "/calendar/:aId",
    views: {
      'calendar-tab': {
        templateUrl: "templates/detail.html",
        controller: 'MapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
})
