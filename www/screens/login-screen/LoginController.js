
Ionic_Frontend.controller('LoginController', ['$scope','$location','$window','$ionicModal','$state','$cordovaToast','$sanitize','LoginDataService','$cookieStore','$ionicLoading','localstorageFactory','$ionicHistory','$ionicPopup','$timeout','$rootScope','ngFB','ionicconfig','$http',function ($scope, $location, $window, $ionicModal, $state, $cordovaToast,$sanitize,LoginDataService,$cookieStore,$ionicLoading,localstorageFactory,$ionicHistory,$ionicPopup,$timeout,$rootScope,ngFB,ionicconfig,$http) {
    //Admin User Controller (login, logout)
    console.log("Inside Login Controller:");
   
     //$scope.location = encodeURIComponent('/#/home');
    //$scope.sameLocation = encodeURIComponent('/#/login');

    $scope.height = $(window).height();

    $rootScope.loginType.normalLogin = true;

    $scope.loginData = {
        "username" : "",
        "password" : ""
    };
    $scope.options = {
        ErrorMessage :"",
        showError : false
    }

    $scope.name = "";
    $scope.validateLogin = function () {
       $("body").height($scope.height);
       $("body").css("background","rgba(211,211,211,.8)");

      $rootScope.$broadcast('loading:show');
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
        });

      if(validator.isEmail($scope.loginData.username)){
        console.log("$scope.name:",$scope.name);
        if (!$scope.loginData.password && !$scope.loginData.username) {
            $scope.options.showError = true;
            $scope.options.ErrorMessage = "Username(Email Id) and Password are Required:";
        } else {
            $scope.loginData.username = $sanitize($scope.loginData.username);
            $scope.loginData.password = $sanitize($scope.loginData.password);
            var userLoginData = {"emailid":$scope.loginData.username,"password":$scope.loginData.password};
            LoginDataService.fetchLoginData(userLoginData).then(function (data) {
                console.log("Data Login:" + JSON.stringify(data));
                localstorageFactory.setObject("userData",data);
               // $timeout(function() {
                $state.go('home', {userId: data._id,type:$rootScope.type});
               // }, 1000);

            },function (err) {
               $ionicLoading.hide();
               $rootScope.$broadcast('loading:hide');
               $scope.options.showError = true;
               console.log("err:",err);
               $scope.options["ErrorMessage"] = "Username or Password wrong";
               
            }).finally(function() {
               //$rootScope.$broadcast('loading:hide');
               $scope.$broadcast('scroll.refreshComplete');
            });

        }

      } else{
          $ionicLoading.hide();
          $rootScope.$broadcast('loading:hide');
          $scope.options.showError = true;
          console.log("email address is not valid:");
          $scope.options["ErrorMessage"] = "Please Enter valid Email address";
      }
   
  }

}]);
