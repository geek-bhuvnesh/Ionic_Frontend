(function(){
  'use strict';

  angular.module('IonicFrontend')
    .controller('TeamsCtrl', ['$scope', 'eliteApi', TeamsCtrl]);
      console.log("Inside team Ctrl:");

      function TeamsCtrl($scope, eliteApi){
        var vm = this;

        vm.loadList = function(forceRefresh){
          eliteApi.getLeagueData(forceRefresh).then(function(data){
            vm.teams = data;
          }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });     
        };

        vm.loadList(false);
 
      };
})();