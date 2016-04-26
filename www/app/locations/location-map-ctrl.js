(function() {
	'use strict';

	angular
	  .module('eliteApp')
	  .controller('LocationMapCtrl', ['$stateParams','eliteApi',LocationMapCtrl]);

	

	function LocationMapCtrl($stateParams,eliteApi) {
		var vm = this;
		vm.locationId = Number($stateParams.id);
  
		vm.map ={
			center:{
				latitude: 38.897677,
				longitude: -77.036530
			},
			zoom:12
		}
		vm.marker ={}

		eliteApi.getLeagueData().then(function(data){
			vm.location = _.find(data.locations,{id:vm.locationId});
			vm.marker = {
				id:vm.locationId,
				coords:{
					latitude: vm.location.latitude,
					longitude: vm.location.longitude,	
				},
				options:{draggable:false,
						 labelContent: vm.location.name,
						 labelAnchor:"100 0",
						 labelClass: "marker-labels"}
				// title: vm.location.name + "<br/>(Tap for directions)",
				// showWindow: true
			};
			console.log(vm.marker);
			vm.title = vm.location.name + "<br/>(Tap for directions)";

			vm.map.center.latitude = vm.location.latitude;
			vm.map.center.longitude = vm.location.longitude;
		}); 

		vm.locationClicked = function(marker){
			window.location = "geo:" + marker.coords.latitude + "," + marker.coords.longitude + ";u=35";
		};
	}
})();