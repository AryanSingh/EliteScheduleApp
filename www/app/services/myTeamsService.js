(function() {
	'use strict';

	angular
	  .module('eliteApp')
	  .factory('myTeamsService', ['CacheFactory',myTeamsService]) 

	function myTeamsService(CacheFactory){
		var self =this;
		self.MyTeamsCache = CacheFactory.get("MyTeamsCache");
	

		function followTeam(team){
			self.MyTeamsCache.put(team.teamId,team);
		}

		function unfollowTeam(team){
			self.MyTeamsCache.remove(team.id.toString());
		} 
 
		function getFollowedTeams(){
			var teams =[],
			keys = self.MyTeamsCache.keys();

			for(var i=0;i<keys.length;i++){
				var team = self.MyTeamsCache.get(keys[i]);
				teams.push(team);
			};
			return teams;
		}

		function isFollowingTeam(teamId){
			var team = self.MyTeamsCache.get(teamId);
			return team;
		}

		return {
			followTeam: followTeam,
			unfollowTeam: unfollowTeam,
			getFollowedTeams: getFollowedTeams,
			isFollowingTeam: isFollowingTeam
		};

	}

	
	
})();