Ionic_Frontend.controller('forgetPwdCtrl', ["forgetPwdData", "$scope","$sanitize","$state","$ionicLoading","$ionicPopup","$timeout",function(forgetPwdData,$scope,$sanitize,$state,$ionicLoading,$ionicPopup,$timeout) {
  
  $scope.forgetPassword = {
        "emailid" : ""
  };
   
  $scope.popMessage = false;
  $scope.popupOpen = false; 
  $scope.isDisabled = false;
  $scope.forgetPassword = function() {
    $scope.popupOpen = false;
    $scope.popMessage = false; 
    $scope.isDisabled = false;


    console.log("ForgetPassword is called");
	  var emailid = $sanitize($scope.forgetPassword.emailid);
    if(emailid) {
  	forgetPwdData.forgetPasswordFn(emailid).then(function(data){
        console.log("Forget Password Result:",data);
        $scope.popupOpen = true;
        $scope.popMessage = true; 
        $scope.isDisabled = true;
      
       $scope.poupmessage ="Please Check your mail,email has been sent to reset Password";

       $timeout(function() {
            $state.go('login');
        },2000);

      },function(err){
        $ionicLoading.hide();
        $scope.errorMessage = err.data;
      })
    } else {
      $ionicLoading.hide();
      $scope.errorMessage = 'Please enter a valid Emailid';
    } 
  } 

  $("div>button").click(function(){
     console.log(">>>>>>>>>>>>>>");
     $state.go('login');
  });

}]);