
Ionic_Frontend.controller('RegistrationController', ['$scope', "$location", "$window", "$ionicModal", "$state", "$cordovaToast","$sanitize","SignUpDataFactory","$ionicLoading","$rootScope", function ($scope, $location, $window, $ionicModal, $state, $cordovaToast,$sanitize,SignUpDataFactory,$ionicLoading,$rootScope) {
    //Admin User Controller (login, logout)
    console.log("Inside Registration Controller:");
    /*$("body").css("background","-webkit-linear-gradient(160deg, rgba(124, 178, 40, 0.8), rgba(80, 179, 226, 0.8))");*/
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
       /* console.log("name type of:", typeof($scope.loginData.name));
        console.log("length:", $scope.loginData.name.length);*/

        $scope.loginData.email = $sanitize($scope.loginData.email);           
        $scope.loginData.password = $sanitize($scope.loginData.password);
        $scope.loginData.confirmPassword = $sanitize($scope.loginData.confirmPassword);

        if($scope.loginData.name.length <3){
          $ionicLoading.hide();  
          alert("user name must contain atleast 3 charachters:");
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
