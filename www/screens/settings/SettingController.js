Ionic_Frontend.controller('SettingController', ['$scope','$state','$cookieStore','$stateParams','$ionicModal','changePwdData','$sanitize','$http','$location','localstorageFactory','$window','$ionicLoading','$ionicPopup','$timeout','$rootScope', function ($scope,$state,$cookieStore,$stateParams,$ionicModal,changePwdData,$sanitize,$http,$location,localstorageFactory,$window,$ionicLoading,$ionicPopup,$timeout,$rootScope) {
  
  console.log("Inside Setting Controller:");
  $scope.homeScreen = true;
  /*console.log("stateParams:",$stateParams);
  $scope.homeScreen = $stateParams.key;
  console.log(">>>>>>>>>>>:",$scope.homeScreen)*/
  //console.log("cookie:",$stateParams);
   //alert("Inside Setting Controller cookieData:" + $cookieStore.get('loginDataCookie'));
   /*var cookieData = $cookieStore.get('loginDataCookie');
   $scope.cookies = $cookieStore.get('loginDataCookie')
   console.log("cookieData:",cookieData);*/


  /*$("body").css("background","url('./img/imagesecond.jpg')");*/

  $scope.popMessage = false;
  $scope.popupOpen = false;
  $scope.isDisabled = false;

  $scope.height =  $("body").height();
  $scope.options = {
        ErrorMessage : "",
        showError : false
  }
  $scope.userData = localstorageFactory.getObject("userData");;
  console.log("userData in setting controlller:" + JSON.stringify($scope.userData));
 // alert("setting controller user data:" +JSON.stringify(userData));

   $scope.logout = function(){
    $cookieStore.remove('loginDataCookie');
    $state.go('login');
   }


  $rootScope.$on('fromHomeScreen',function(event, booleanValue){
      console.log("booleanValue:",booleanValue);
      $scope.homeScreen = booleanValue;
  }) 

  $scope.goTOHome = function(){
    console.log("Inside go to home:" +  $scope.userData._id);
    $rootScope.$broadcast("fromSetting",$scope.homeScreen);
    $state.go('home',{userId:$scope.userData._id});
  }

  /*$scope.backToHome = function(){
     alert("state changed to home:");
     console.log(">>>>>>>>>>>>>>>>>>");
     //$state.go('home', {}, {reload: true});
     $ionicHistory.clearCache()
     $state.go('home');
     //$window.location.reload(true)
   }*/

/*ui-sref="home"*/
  /*$scope.backButton = function(){
    alert("Inside back button:");
    $state.go('home');
    /*$scope.$apply();
  }*/
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

  /*document.getElementById.onkeypress =function(event){
    console.log("inside on key press:");
    $("body").height($scope.height);
    alert(">>>>>on key press height:" + $("body").height());
   // $scope.errorMessage = "here error accur";
  }*/
  $scope.change_password_data = {
    "current_password":"",
    "new_password": "",
    "confirm_password" : ""
  };

  /*$scope.change_password_data = {};*/

  $scope.changePassword = function(cookie) {
    $scope.options.showError = false;

    /*console.log("Changepassword is called",cookieData); */
   /* alert("inside change password cookieData:" + cookieData);
    alert("cookie:"+cookie);*/
    //var userid = "geek.bhuvnesh@gmail.com";
    var userid = $scope.userData.email_id;
    if (userid) {
      /*var userid = cookie.email_id;*/
      console.log("userid>>>>>>",userid)
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
         /* var myPopup = $ionicPopup.show({
              title: 'Message',
              template: '<div><p ><b>Password Changed Successfully</b></p></div>'
          })
          myPopup.then(function(res){
              console.log("alert response:" + res);
              $scope.changePasswordModal.hide();
          });
          console.log("myPopup>>>",myPopup);
          $timeout(function() {
              myPopup.close(); //close the popup after 6 seconds for some reason
          },2000);*/
          
        },function(err){  
          $scope.options.showError = true;
          $ionicLoading.hide();
          $scope.errorMessage = err.data;
        })

       /*$http.post("http://192.168.100.129:5000/changepassword/" + userid,
            {
            new_password:changePasswordData.new_password,
            old_password:changePasswordData.current_password,
            withCredentials:true
            },
            {
            headers: {
                'Content-Type': 'application/json'
            }
       }).success(function (data, status, headers, config) {
          console.log("changed password data:" + JSON.stringify(data));
           $scope.changePasswordModal.hide();
          
       }).error(function (data, status, headers, config) {
        console.log("error:",data);
      });*/

      } /*else {
        //$scope.loginPopup();
      }*/
    } /*else{
      //$scope.loginPopup();
    }*/
  }


}]);
