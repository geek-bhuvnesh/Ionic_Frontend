Ionic_Frontend.controller('SettingController', ['$scope','$state','$cookieStore','$stateParams','$ionicModal','changePwdData','$sanitize','$http','$location','localstorageFactory','$window','$ionicLoading','$ionicPopup','$timeout','$rootScope', function ($scope,$state,$cookieStore,$stateParams,$ionicModal,changePwdData,$sanitize,$http,$location,localstorageFactory,$window,$ionicLoading,$ionicPopup,$timeout,$rootScope) {
  
  console.log("Inside Setting Controller:");
  $scope.homeScreen = true;


  $scope.popMessage = false;
  $scope.popupOpen = false;
  $scope.isDisabled = false;

  if($rootScope.type!="normal"){
    $rootScope.loginType.normalLogin = false;
  }else{
    $rootScope.loginType.normalLogin = true;
  }
 

  $scope.height =  $("body").height();
  $scope.options = {
        ErrorMessage : "",
        showError : false
  }
  $scope.userData = localstorageFactory.getObject("userData");
  console.log("userData in setting controlller:" + JSON.stringify($scope.userData));


   $scope.logOut = function(){
    localstorageFactory.removeObject("userData");
   // localstorageFactory.remove("userData");
    $state.go('login');
   }


  $rootScope.$on('fromHomeScreen',function(event, booleanValue){
      console.log("booleanValue:",booleanValue);
      $scope.homeScreen = booleanValue;
  }) 

  $scope.goTOHome = function(){
    /*console.log("Inside go to home:" +  $scope.userData._id);*/
    $rootScope.$broadcast("fromSetting",$scope.homeScreen);
    console.log("userId",$stateParams.userId);
    console.log("type",$rootScope.type);
    $state.go('home', {userId: $stateParams.userId,type:$rootScope.type})
  }

       // Create our modal
  $ionicModal.fromTemplateUrl('changepassword.html', function(modal) {
  	console.log("---------------------");
    $scope.changePasswordModal = modal;
    console.log("$scope.changePasswordModal", $scope.changePasswordModal);
  }, {
    scope: $scope
  });

  $scope.changePasswordPopUp = function() {
    /*alert("height<<<:"+ $("body").height());*/
    $scope.popMessage = false;
    $scope.popupOpen = false;
    $scope.isDisabled = false;

   $scope.change_password_data = {
    "current_password":"",
    "new_password": "",
    "confirm_password" : ""
    };
  	console.log("Inside changePasswordModal Show:");
    $scope.awesome = true;
    $scope.changePasswordModal.show();
    if($("div.modal-wrapper")){
        $("div.modal-wrapper").height($scope.height);
        //alert("height set:");
    } else{
        alert("wrapper class not found:");
    }
    $(".modal, .pane").height($scope.height);
    $(".modal, .pane").css("background","rgba(211,211,211,.8)");
  };  

  $scope.closeChangePasswordPopUp = function() {
    console.log("Inside changePasswordModal Hide:");
    $scope.changePasswordModal.hide();
  }

  $scope.change_password_data = {
    "current_password":"",
    "new_password": "",
    "confirm_password" : ""
  };

  /*$scope.change_password_data = {};*/

  $scope.changePassword = function(cookie) {
    $scope.options.showError = false;


    var userid = $scope.userData.email_id;
    if (userid) {
  
      console.log("userid:",userid)
      //alert("userid:" + userid);
      $scope.change_password_data.current_password = $sanitize($scope.change_password_data.current_password);
      $scope.change_password_data.new_password = $sanitize($scope.change_password_data.new_password);
      $scope.change_password_data.confirm_password = $sanitize($scope.change_password_data.confirm_password);
      
      var changePasswordData = {"current_password": $scope.change_password_data.current_password,
                                "new_password": $scope.change_password_data.new_password,
                                "confirm_password": $scope.change_password_data.confirm_password};

      console.log("Change Password Data:"+JSON.stringify(changePasswordData));
      console.log("old password:"+$scope.userData.password);
      //alert("changePasswordData:" +changePasswordData);
      if(!changePasswordData.current_password){
        $scope.options.showError = true;
        $scope.errorMessage = "Old Password is mandatory:";
        $ionicLoading.hide();
        return;
      } else if(changePasswordData.current_password!=$scope.userData.password){
        $scope.options.showError = true;
        $scope.errorMessage = "Please Enter correct old password:";
        $ionicLoading.hide();
        return;
      }                   
      else if (!changePasswordData.new_password || !changePasswordData.confirm_password) {
        $scope.options.showError = true;
        if(!changePasswordData.new_password && !changePasswordData.confirm_password){
          $scope.errorMessage = "New Password and Confirm Password Fields are mandatory:"
        }
        else if(!changePasswordData.new_password){
          $scope.errorMessage = "400_new_password_cannot_be_blank";
        }
        else if(!changePasswordData.confirm_password){
          $scope.errorMessage = "400_confirm_password_cannot_be_blank";
        }
        $ionicLoading.hide();
        return;
      } else if (changePasswordData.new_password != changePasswordData.confirm_password) {
        $scope.options.showError = true;
        $scope.errorMessage = "400_password_not_matched";
        $ionicLoading.hide();
        return;
      } else if(changePasswordData.current_password == changePasswordData.new_password){
        $scope.options.showError = true;
        $scope.errorMessage = "Please enter different value to change password";
        $ionicLoading.hide();
        return;
      }
      if (userid) {

        changePwdData.changePasswordFn(userid,changePasswordData).then(function(data){
          
          console.log("change Password result:" +JSON.stringify(data));
           $scope.popMessage = true;
           $scope.popupOpen = true;
           $scope.isDisabled = true;
           $scope.poupmessage ="Password Changed Successfully";
           $scope.userData["password"] = data.password;
           localstorageFactory.setObject("userData",$scope.userData);
           console.log("new local storage data:" + JSON.stringify(localstorageFactory.getObject("userData")));

            $timeout(function() {
               $scope.changePasswordModal.hide();
            },2000);
    
          
        },function(err){  
          $scope.options.showError = true;
          $ionicLoading.hide();
          $scope.errorMessage = err.data;
        })

      } /*else {
        //$scope.loginPopup();
      }*/
    } /*else{
      //$scope.loginPopup();
    }*/
  }


}]);
