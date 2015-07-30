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
    // console.log("login details are  " + JSON.stringify(user) );
    if(emailid) {
  	forgetPwdData.forgetPasswordFn(emailid).then(function(data){
        console.log("Forget Password Result:",data);
        $scope.popupOpen = true;
        $scope.popMessage = true; 
        $scope.isDisabled = true;
        /*var myPopup = $ionicPopup.show({
            title: 'Message',
            template: 'Please Check your mail,email has been sent to reset Password:'
        })
        myPopup.then(function(res){
           console.log("alert response:" + res);
        });
        $timeout(function() {
           // myPopup.close(); //close the popup after 2 seconds for some reason
           // $state.go('login');
        }, 2000);*/
        //$state.go('login');
      
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

  /*$buttonTapped = function(button,$event){
    
     
  }*/

  $("div>button").click(function(){
     console.log(">>>>>>>>>>>>>>");
     $state.go('login');
  });

}]);