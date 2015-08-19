Ionic_Frontend.controller('parentCtrl',['$scope','$http','$rootScope','ionicconfig','localstorageFactory',function($scope,$http,$rootScope,ionicconfig,localstorageFactory){

  $rootScope.type = "normal";

  $rootScope.loginType ={
    "normalLogin":true
  }
  $rootScope.homeurl = 'http://localhost'
}]);	