(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamDetailCtrl', ['$stateParams', 'eliteApi','$ionicPopup','myTeamsService', TeamDetailCtrl]);

    function TeamDetailCtrl($stateParams, eliteApi,$ionicPopup,myTeamsService) {
        var vm = this;
        vm.isWin = isWin;
        vm.teamId = Number($stateParams.id);


        activate();

        function activate(){
           eliteApi.getLeagueData().then(function(data){
	            vm.team = _.find(data.teams, { "id": vm.teamId });

	            vm.games = _.chain(data.games)
	                        .filter(isTeamInGame)
	                        .map(function (item) {
	                            var isTeam1 = (item.team1Id === vm.teamId ? true : false);
	                            var opponentName = isTeam1 ? item.team2 : item.team1;
	                            var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
	                            return {
	                                gameId: item.id,
	                                opponent: opponentName,
	                                time: item.time,
	                                location: item.location,
	                                locationUrl: item.locationUrl,
	                                scoreDisplay: scoreDisplay,
	                                homeAway: (isTeam1 ? "vs." : "at")
	                            };
	                        })
	                        .value();

	            var standings = data.standings;
           	
	            var standArr = [];
	            for (var i = 0; i < standings.length; i++) {
	            	standArr.push(standings[i].divisionStandings);
	            }
	            
	            standArr = _.flatten(standArr);

	            
	            vm.teamStanding = _.find(standArr,{ "teamId" : vm.teamId });
	            vm.following = false;
	            vm.toggleFollow = function(){
	            	if(vm.following){
	            		var confirmPopup = $ionicPopup.confirm({
	            			title: 'Unfollow',
	            			template: 'Are you sure you want to Unfollow'
	            		});
	            		confirmPopup.then(function(res){
	            			if(res){
	            				vm.following= !vm.following;
	            			}
	            		})
	            	}else{
	            		vm.following = !vm.following;
	            	}
	             }
           })

            
            // console.log(data.standings);
            				   // .find({ "teamId" : vm.teamId })
            
        };

        function isTeamInGame(item, teamId){
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }

        function getScoreDisplay(isTeam1, team1Score, team2Score) {
            if (team1Score && team2Score) {
                team1Score = Number(team1Score);
                team2Score = Number(team2Score);
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
            else {
                return "";
            }
        }

        function isWin(game){
            return game.scoreDisplay.indexOf("W:") === 0;
        }

        function toggleFollow(team){
        	if(isFollowingTeam(team)){
        		unfollowTeam(team);
        	}
        	else{
        		followTeam(team);
        	}
        }

    };
})();
// (function(){
// 	'use strict';
// 	angular.module('eliteApp').controller('TeamDetailCtrl',['eliteApi','$stateParams',TeamDetailCtrl]);

// 	TeamDetailCtrl();
// 	function TeamDetailCtrl(eliteApi,$stateParams){
// 		var vm = this;
// 		// console.log("$stateParams", $stateParams);
// 		vm.teamId = Number($stateParams.id);
// 		var data = eliteApi.getLeagueData();
// 		var team = _.chain(data.teams)
// 					.flatten("divisonTeams")
// 					.find({"id":vm.teamId})
// 					.value();

// 	    vm.teamName = team.name;
// 	    vm.games = _.chain(data.games)
// 	     		    .filter(isTeamInGame)
// 	     		    .map(function(item){
// 	     		    	var isTeam1 = (item.team1Id === vm.teamId? true : false);
// 	     		    	var opponentName = isTeam1? item.team2: item.team1;
// 	     		    	var scoreDisplay = getScoreDisplay(isTeam1,item.team1,item.team2);
// 	     		    	return{
// 	     		    		gameId: item.id,
// 	     		    		opponent: opponentName,
// 	     		    		time:item.time,
// 	     		    		location:item.location,
// 	     		    		locationUrl:item.locationUrl,
// 	     		    		scoreDisplay:item.scoreDisplay,
// 	     		    		homeAway:(isTeam1? "vs.":"at")
// 	     		    	};	
// 	     		    }).value();

	

// 		function isTeamInGame(item,teamId){
// 			return (item.team1Id === vm.teamId || item.team2Id === vm.teamId);
// 		}

// 		function getScoreDisplay(isTeam1, team1Score, team2Score) {
// 	        if (team1Score && team2Score) {
// 	            team1Score = Number(team1Score);
// 	            team2Score = Number(team2Score);
// 	            var teamScore = (isTeam1 ? team1Score : team2Score);
// 	            var opponentScore = (isTeam1 ? team2Score : team1Score);
// 	            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
// 	            return winIndicator + teamScore + "-" + opponentScore;
// 	        }
// 	        else {
// 	            return "";
// 	        }
// 	    }

// 	    function isWin(game){
// 	        return game.scoreDisplay.indexOf("W:") === 0;
// 	    }

// 	}
// })();