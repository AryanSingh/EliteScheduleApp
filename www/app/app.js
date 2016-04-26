 angular.module('eliteApp', ['ionic','angular-cache','uiGmapgoogle-maps'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    CacheFactory("leagueDataCache",{ storageMode: "localStorage", maxAge:24*3600*1000, deleteOnExpire: "aggressive"});
    CacheFactory("leaguesCache",{ storageMode: "localStorage", maxAge:24*3600*1000, deleteOnExpire: "aggressive"});
    CacheFactory("MyTeamsCache",{ storageMode: "localStorage"});
    CacheFactory("staticCache",{ storageMode: "localStorage"});
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

    .state('home', {
    url: '/home',
    abstract: true,
    templateUrl: 'app/home/home.html'
  })
    .state('home.leagues',{
    	url:"/leagues",
    	views:{
    		"tab-leagues": {
    			templateUrl:"app/home/leagues.html"
    		}
    	}
    })

    .state('home.myteams',{
    	url:"/myteams",
    	views:{
    		"tab-myteams": {
    			templateUrl:"app/home/myteams.html"
    		}
    	}
    })
    .state('app',{
    	url: '/app',
    	abstract:true,
    	templateUrl: 'app/layout/menu-layout.html'
    })
    .state('app.teams',{
    	url:"/teams",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/teams/teams.html"
    		}
    	}
    })

    .state('app.team-detail',{
    	url:"/teams/:id",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/teams/team-detail.html"
    		}
    	}
    })

    .state('app.game',{
    	url:"/game/:id",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/game/game.html"
    		}
    	}
    })
    .state('app.standings',{
    	url:"/standings",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/standings/standings.html"
    		}
    	}
    })

    .state('app.locations',{
    	url:"/locations",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/locations/location.html"
    		}
    	}
    })

    .state('app.location-map',{
        url:"/location-map/:id",
        views:{
            'mainContent':{
                templateUrl:"app/locations/location-map.html"
            }
        }
    })

    .state('app.rules',{
    	url:"/rules",
    	views:{ 
    		"mainContent": {
    			templateUrl:"app/rules/rules.html"
    		}
    	}
    });

  $ionicConfigProvider.tabs.position('bottom');

  $urlRouterProvider.otherwise('/home/leagues');
})

 .config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
}]);