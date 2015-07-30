(function(){
  'use strict';

  angular.module('IonicFrontend')
    .controller('StandingsCtrl', ['eliteApi', StandingsCtrl]);
      console.log("Inside Standing Ctrl:");

      function StandingsCtrl(eliteApi){
        var vm = this;
        eliteApi.getLeagueData().then(function(data){
          vm.teams = data.standings;
        });
      };
})();