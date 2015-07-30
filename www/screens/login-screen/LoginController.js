
Ionic_Frontend.controller('LoginController', ['$scope','$location','$window','$ionicModal','$state','$cordovaToast','$sanitize','LoginDataService','$cookieStore','$ionicLoading','localstorageFactory','$ionicHistory','$ionicPopup','$timeout','$rootScope',function ($scope, $location, $window, $ionicModal, $state, $cordovaToast,$sanitize,LoginDataService,$cookieStore,$ionicLoading,localstorageFactory,$ionicHistory,$ionicPopup,$timeout,$rootScope) {
    //Admin User Controller (login, logout)
    console.log("Inside Login Controller:");
    //$("body").height(1100);
    /*var height = document.body.clientHeight;
    console.log("Height:",height);
    var height1 = $window.innerHeight;
    console.log("height1:",height1);*/

    /*$window.innerHeight = 1100;
    console.log("after set height:",$window.innerHeight);*/
   // $state.go('register');
    
   
    $scope.height = $(window).height();
 /* $("body").height($scope.height);*/
   // alert("Login height:"+$scope.height);
    $scope.loginData = {
        "username" : "",
        "password" : ""
    };
    $scope.options = {
        ErrorMessage :"",
        showError : false
    }

      //(ng-class="{'selected':$index == focusIndex}" = ! >>>ng-show="$index == focusIndex")



   /* document.addEventListener("deviceready", function () {
       console.log("Inside device ready:");
       alert("Inside device ready>>>")
       var device = $cordovaDevice.getDevice();

        var cordova = $cordovaDevice.getCordova();

        var model = $cordovaDevice.getModel();

        var platform = $cordovaDevice.getPlatform();

        var uuid = $cordovaDevice.getUUID();

        var version = $cordovaDevice.getVersion();

        console.log("device,cordova,model,platform,uuid,version:",device,cordova,model,platform,uuid,version);
        alert("device,cordova,model,platform,uuid,version:",device,cordova,model,platform,uuid,version);
     }, true);*/

    //$scope.loginPopUp = true;
    $scope.name = "";
    $scope.validateLogin = function () {
       /* $ionicHistory.clearHistory();
        $ionicHistory.clearCache();*/
       console.log(">>>>>>>>>>>>>:" + $scope.height);
       $("body").height($scope.height);
       $("body").css("background","rgba(211,211,211,.8)");
       //alert("$scope.height1:" + $("body").height());
        //console.log(">>>>>>>>" +$("body").height());
        /*$ionicLoading.show({
             template:  '<p>Loading...</p><ion-spinner></ion-spinner>'
        },{
            noBackdrop: true
        })*/
         
      $rootScope.$broadcast('loading:show');

  /* User.get().then(function(user){
  $scope.user = user;
}).finally(function(){
  $rootScope.$broadcast('loading:hide');
});*/
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
        });
        console.log("$scope.name:",$scope.name);
        if (!$scope.loginData.password && !$scope.loginData.username) {
            $scope.options.showError = true;
            $scope.options.ErrorMessage = "Username(Email Id) and Password are Required:";
        } else {
            $scope.loginData.username = $sanitize($scope.loginData.username);
            $scope.loginData.password = $sanitize($scope.loginData.password);
            var userLoginData = {"emailid":$scope.loginData.username,"password":$scope.loginData.password};
            LoginDataService.fetchLoginData(userLoginData).then(function (data) {
               //alert("$scope.height2:" + $("body").height());
                  // Put cookie
                /*$cookies.put('loginDataCookie',data,{
                             expires: new Date(2016, 1, 1)
                });*/
                //$ionicLoading.hide();
                //$cookieStore.put('loginDataCookie',data);
                console.log("Data Login:" + JSON.stringify(data));
                localstorageFactory.setObject("userData",data);
               /* $timeout(function() {*/
                $state.go('home', {userId: data._id});
               /* }, 1000);*/

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
    }

   /* $scope.closeLogin = function() {
        $scope.loginPopUp = false;
    }
   */
}]);
