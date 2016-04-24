
(function() {
	'use strict';

	angular
	  .module('eliteApp')
	  .controller('GameCtrl', ['$stateParams','eliteApi',GameCtrl]);


	function GameCtrl($stateParams,eliteApi) {
		var vm = this;
		eliteApi.getLeagueData().then(function(data){
			
			var gameId = Number($stateParams.id);
			// console.log(data);
			vm.game = _.find(data.games,{"id": gameId});
			// console.log(vm.game);
		})
	}
})();