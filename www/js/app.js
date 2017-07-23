// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-material', 'starter.service',  'starter.controllers', 'starter.directives', 'third.controllers',  'second.controllers'])

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
        templateUrl: "templates/home.html"
        //controller: 'MapCtrl'
      }
    }
  })

  // .state('tabs.list', {
  //   url: "/list",
  //   views: {
  //     'list-tab': {
  //       templateUrl: "templates/list.html",
  //       controller: 'MapCtrl'
  //     },
  //     'fabContent': {
  //       template: '<button ng-click="go()" id="fab-profile" class="button button-fab button-fab-bottom-left button-positive"><i class="icon ion-model-s"></i></button>',
  //       controller: 'Get_data'    
  //       }
  //     }
    
  // })
  .state('tabs.list', {
    url: "/list",
    views: {
      'list-tab': {
        templateUrl: "templates/list.html",
        controller: 'MapCtrl'
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
      url: "/route/:result",
      views: {
        'calendar-tab': {
          templateUrl: "templates/rute.html",
          controller: 'Hasil_data'
        }
      }
      
  })
  .state('tabs.masteredge', {
      url: "/jalan",
      views: {
        'calendar-tab': {
          templateUrl: "templates/listedge.html",
          controller: 'View_edge'
        }
      }
  })
  .state('tabs.masterwilayah', {
      url: "/wilayah",
      views: {
        'calendar-tab': {
          templateUrl: "templates/listwilayah.html",
          controller: 'View_wilayah'
        }
      }
  })
  .state('tabs.street', {
      url: "/street/:lat/:lng/:name",
      views: {
        'calendar-tab': {
          templateUrl: "templates/street.html",
          controller: 'Street_view'
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

  $urlRouterProvider.otherwise('/tab/list');
})
.config(['$ionicConfigProvider', function($ionicConfigProvider){
    $ionicConfigProvider.tabs.position('bottom');
}])
