
Ionic_Frontend.controller('RegistrationController', ['$scope', "$location", "$window", "$ionicModal", "$state", "$cordovaToast","$sanitize","SignUpDataFactory","$ionicLoading","$rootScope", function ($scope, $location, $window, $ionicModal, $state, $cordovaToast,$sanitize,SignUpDataFactory,$ionicLoading,$rootScope) {
    console.log("Inside Registration Controller:");
    $("body").height($scope.height);
    $scope.loginData ={
        "name" : "",
        "email" : "",
        "password" : ""
    };
    $scope.options = {
        ErrorMessage :"",
        showError : false
    }

    //$scope.loginPopUp = true;
    $scope.Signup = function(){
        //console.log("submit signup data");
    
        $rootScope.$broadcast('loading:show');
        $scope.loginData.name = $sanitize($scope.loginData.name);
        console.log("$scope.loginData.name:", $scope.loginData.name);
  

        $scope.loginData.email = $sanitize($scope.loginData.email);           
        $scope.loginData.password = $sanitize($scope.loginData.password);
        $scope.loginData.confirmPassword = $sanitize($scope.loginData.confirmPassword);

        if(!validator.isByteLength($scope.loginData.name,3,10)){
          //alert("User Name must contain 3 charatcer and Max 10 char:");
          $scope.options.showError = true;
          $scope.options.errorMessage = "User Name must contain 3 charatcer and Max 10 char:";
          $ionicLoading.hide();
          return;
        }
        
        if(!validator.isEmail($scope.loginData.email)){
          $scope.options.showError = true;
          $scope.options.errorMessage = "Please Enter valid Email:";
          $ionicLoading.hide();
          return;
        }
        if ($scope.loginData.password != $scope.loginData.confirmPassword) {
            $ionicLoading.hide();
            alert("These passwords don't match. Try again");
        } else if ($scope.loginData.password.length < 8) {
            alert("password must contain more than 8 charachters:")
        }else {

          $scope.signUpDetails = {
                name: $scope.loginData.name,
                email: $scope.loginData.email,
                password: $scope.loginData.password
          };
          console.log("Sign up Details:" + JSON.stringify($scope.signUpDetails));
          SignUpDataFactory.registerUser($scope.signUpDetails).then(function(data){
            console.log("Singup Data:" ,JSON.stringify(data));
            $state.go('login');
            $ionicLoading.hide();
            
           },function(err){
            $ionicLoading.hide();
            if (err.status == 400) {
             $scope.passwordErrorMessage = err.data;
          }
        })
        }

    }

}]);
