(function() {
	'use strict';

	angular
	  .module('eliteApp')
	  .factory('eliteApi', ['$http','$q','$ionicLoading','CacheFactory',eliteApi]);
	  function eliteApi($http,$q,$ionicLoading,CacheFactory){

	  	

	  	self.leaguesCache = CacheFactory.get("leaguesCache");
	  	self.leagueDataCache = CacheFactory.get("leagueDataCache");

	  	self.leaguesCache.setOptions({
	  		onExpire: function(key,value){
	  			getLeagues()
	  			.then(function(){
	  				console.log("refreshed",new Date());
	  			},function(){
	  				console.log("error",new Date());
	  				self.leaguesCache.put(key,value);
	  			});
	  		}
	  	});

	  	self.leagueDataCache.setOptions({
	  		onExpire: function(key,value){
	  			getLeagueData()
	  			.then(function(){
	  				console.log("refreshed",new Date());
	  			},function(){
	  				console.log("error",new Date());
	  				self.leaguesDataCache.put(key,value);
	  			});
	  		}
	  	});

	  	self.staticCache = CacheFactory.get("staticCache");

	  	function setLeagueId(leagueId){
	  		self.staticCache.put("currentLeagueId",leagueId);
	  	}

	  	function getLeagueId(){
	  		return self.staticCache.get("currentLeagueId");
	  	}


	  	function getLeagues(){
	  		var deferred = $q.defer(),  
	  		cacheKey = "leagues",
	  		leaguesData = self.leaguesCache.get(cacheKey);

	  		if(leaguesData){
	  			deferred.resolve(leaguesData);
	  		}else{
		  		$http.get("http://elite-schedule.net/api/leaguedata")
		  			.success(function(data){
		  				self.leaguesCache.put(cacheKey,data);
		  				deferred.resolve(data);
		  			})
		  			.error(function(){
		  				console.log("error while making the http call");
		  				deffered.reject();
		  			}); 
	  		}
		  	return deferred.promise;
	  			
	  	}
	  	// console.log(currentLeagueId);

	  	function getLeagueData(){   
	  		var deferred = $q.defer(),
	  		cacheKey = "leagueData-" + getLeagueId(),
	  		leagueData = self.leagueDataCache.get(cacheKey); 
       
	  		if(leagueData){
	  			deferred.resolve(leagueData);
	  		}else{

		  		$ionicLoading.show({template: 'Loading ...'});
		  		$http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
		  			.success(function(data,status){
		  				console.log("received schedule data via http", data, status);
		  				self.leagueDataCache.put(cacheKey,data);
		  				$ionicLoading.hide();
		  				deferred.resolve(data); 
		  			})
		  			.error(function(){
		  				console.log("error while making the http call");
		  				deferred.reject();
		  			}); 
	  		}

	  	    return deferred.promise; 
	  	}

	  	
	  	return{
	  		getLeagues: getLeagues,
	  		getLeagueData: getLeagueData,
	  		setLeagueId: setLeagueId
	  	};
	  };

})();