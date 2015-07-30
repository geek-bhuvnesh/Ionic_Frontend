
Ionic_Frontend.controller('changePwdCtrl', ["changePwdData","$scope","$sanitize", function (changePwdData, $scope, $sanitize) {
  // $scope.errorMessage = "here error accur";
  $scope.change_password_data = {};

  $scope.changePassword = function() {
    console.log("Changepassword is called");
    if ($scope.user) {
      var userid = $scope.user._id;

      $scope.change_password_data.current_password = $sanitize($scope.change_password_data.current_password);
      $scope.change_password_data.new_password = $sanitize($scope.change_password_data.new_password);
      $scope.change_password_data.confirm_password = $sanitize($scope.change_password_data.confirm_password);
      
      var changePasswordData = {"current_password": $scope.change_password_data.current_password,
                                "new_password": $scope.change_password_data.new_password,
                                 "confirm_password": $scope.change_password_data.confirm_password}
      if (changePasswordData.new_password != changePasswordData.confirm_password) {
        $scope.errorMessage = "400_password_not_matched";
        return;
      } else if (!changePasswordData.new_password) {
        $scope.errorMessage = "400_new_password_cannot_be_blank";
        return;
      } 
      if (userid) {
        changePwdData.changePasswordFn(userid,changePasswordData).then(function(data){
          console.log("change Password result:" +JSON.stringify(data));
        },function(err){
          $scope.errorMessage = err.data;
        })
      } else {
        $scope.loginPopup();
      }
    } else{
      $scope.loginPopup();
    }
  }
}]);