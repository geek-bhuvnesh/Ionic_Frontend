Ionic_Frontend.controller('resetPwdCtrl', ["resetPwdData", "$scope","$state", "$stateParams","$cookies","$rootScope","$sanitize","$ionicLoading", function (resetPwdData, $scope, $state, $stateParams, $cookies,$rootScope,$sanitize,$ionicLoading) {
 
  console.log("Inside Reset Password Controller:");

  $scope.reset = {password_changed:false};

  $scope.resetSuccess = false;

  console.log("state params:" ,$stateParams);
  console.log("state params token:" ,$stateParams.reset_pass_token);
  console.log("state params emailid:" ,$stateParams.email_id);

  $scope.resetPassword = function() {
    console.log("ResetPassword is called");
    $scope.reset.password = $sanitize($scope.reset.password);
    $scope.reset.confirm_password = $sanitize($scope.reset.confirm_password);
    var resetPasswordData = {"password": $scope.reset.password, "confirm_password": $scope.reset.confirm_password, "reset_pass_token": $stateParams.reset_pass_token, "emailid": $stateParams.email_id};
    console.log("login details are after reset Password: " + JSON.stringify(resetPasswordData) );
    
    if (resetPasswordData.password && resetPasswordData.confirm_password) {
      if(resetPasswordData.password == resetPasswordData.confirm_password) {

      	resetPwdData.resetPasswordFn(resetPasswordData).then(function(data){

            console.log("Reset Password Data on success:" + JSON.stringify(data));
            $scope.reset.password_changed = true;
          /*  var cookiesdata = {'email':data.email,'username':data.username,
                           'first_name':data.first_name,'last_name':data.last_name};
            $cookies.user = {};
            $cookies.user = JSON.stringify(cookiesdata);
            $rootScope.$emit('userChange', data);

            $scope.user_status.is_logged_in = true;*/

            //$state.go('home');
            $scope.resetSuccess = true;
          },function(err){
            $scope.errorMessage = err.data;
            $ionicLoading.hide();
          })
      } else {
        $scope.errorMessage = "400_password_not_matched";
        $ionicLoading.hide();
      }
    } else {
      $scope.errorMessage = "password_and_confirm_password_cannot_blank";
      $ionicLoading.hide();
    } 
  } 
}]);