Ionic_Frontend.controller('HomeController',['$scope','$http','$ionicSideMenuDelegate','$ionicModal','$sanitize','$cookieStore','CustomerDataService','$state','localstorageFactory','$ionicLoading','$ionicPopup','$timeout','$rootScope','Customers',function($scope,$http,$ionicSideMenuDelegate,$ionicModal,$sanitize,$cookieStore,CustomerDataService,$state,localstorageFactory,$ionicLoading,$ionicPopup,$timeout,$rootScope,Customers){
  console.log("Inside Home Controller");
  $scope.homeScreen = true;
  //$rootScope.$on('loading:hide');
  $ionicLoading.hide();
  /*$("body").height(1100);*/
  //alert("move to Home controller:");
    // Get cookie
 // var userLoginDataCookie = $cookieStore.get('loginDataCookie');
  //console.log("userLoginDataCookie>>>",userLoginDataCookie);

  //$scope.cookie = userLoginDataCookie;

  //$scope.userName = userLoginDataCookie.email_id;
  //$scope.userId = userLoginDataCookie._id;
  /*$scope.userName = "geek.bhuvnesh@gmail.com";
  $scope.userId = "559ebbf3de8dd3840c75fe63";*/
  
  $scope.popMessage = false;
  $scope.popupOpen = false;

  $scope.customers = Customers;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>Before:" + JSON.stringify($scope.customers));
  if($scope.customers.length>0){
    $scope.allCustomers = $scope.customers.reverse();
  } else{
    $scope.allCustomers =[];
  }

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>After:" + JSON.stringify($scope.allCustomers));
  $scope.height = $(window).height();
  //alert("$scope.height in home controller:" +$scope.height);
  $("body").css("background","rgba(211,211,211,.8)");

  //alert("home screen height:" +  $scope.height);
  
  var userData = localstorageFactory.getObject("userData");
  console.log("userData>>>>>>>>>>" + JSON.stringify(userData));
  
  //alert("Home controller user data:" +JSON.stringify(userData));
   
  $scope.userName = userData.email_id;
  $scope.userId = userData._id;

   $scope.addCustomerData = {
    "name" : "",
    "email": "",
    "address" : ""
  }

  $scope.RelativeObj ={
    "name" : "",
    "relation" :""
  }

  $scope.options = {
     ErrorMessage :"",
     showError : false
  }

  $scope.goToSetting = function(){
    console.log("Inside go to setting:",$scope.homeScreen);
    $state.go('settings');
    $rootScope.$broadcast("fromHomeScreen",$scope.homeScreen);
  };

  $rootScope.$on('fromSetting',function(event, booleanValue){
      console.log("booleanValue home:",booleanValue);
      $scope.homeScreen = booleanValue;
  }) 

  $scope.homeSelect = function(){
    console.log("Inside home select:");
    $scope.homeScreen = true;
   //$("a").css("background-color: #387ef5;");
  }
  //alert("1:");
  /* $http.get("http://192.168.100.98:5500/allCustomers/" + $scope.userId, {
            headers: {
                'Content-Type': 'application/json'
        }
    }).success(function (data, status, headers, config) {
        console.log("Data All customers:" + JSON.stringify(data));
        if(data.length>0){
           $scope.allCustomers = data.reverse();
        }
        console.log("array after reverse:" + JSON.stringify($scope.allCustomers));
        if(data.length>0){
           $scope.allCustomers = data;
           console.log("Before remove array:" + JSON.stringify($scope.allCustomers));
           var item =  $scope.allCustomers.splice($scope.allCustomers.length-1,1)
           console.log("After remove array:" + JSON.stringify($scope.allCustomers));
           console.log("item remove:"+JSON.stringify(item));
           //for(var i=0;i<)
           $scope.allCustomers.splice(0,0,item);
           console.log("updated array:" + JSON.stringify($scope.allCustomers));
        }
        
        $scope.height = $(".pane, .view").height();
        //console.log("height:",height);
        //alert("$scope.height:"+$scope.height);
    }).error(function (data, status, headers, config) {
        console.log("error:",data);
    });*/

  /*  //alert("2:");
  var obj= {
     "menu_name" : "Color",
     "menu_name" : "Hi"
    }
  console.log("obj:",obj);*/
 
 /* $scope.leftToggle = false;
  var count = 0;
  $scope.toggleSideMenu = function() {
    count++;
    console.log("count:",count);
    console.log("Inside toggleProjects function" );
    $ionicSideMenuDelegate.toggleLeft();
    if(count%2!=0){
      $scope.leftToggle = true;
    }else{
      $scope.leftToggle = false;
    }

  };
     //alert("3:");

  $scope.toggleSideMenuRight = function() {
  	$ionicSideMenuDelegate.toggleRight();
  }*/
    // Create our modal

  $scope.doRefresh = function() {
    console.log("Inside Do refresh method:");
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };

  $ionicModal.fromTemplateUrl('addCustomer.html', function(modal) {
  	console.log("---------------------");
    $scope.addCustomerModal = modal;
    console.log("$scope.addCustomerModal >>>>>>>>>", $scope.addCustomerModal);
  }, {
    scope: $scope
  });

  $ionicModal.fromTemplateUrl('popup.html', function(modal) {
    console.log("---------------------");
    $scope.popupModal = modal;
    console.log("$scope.popupModal >>>>>>>>>", $scope.popupModal);
  }, {
    scope: $scope
  });

  $scope.addCustomer = function() {
    $scope.addCustomerData = {
      "name" : "",
      "email": "",
      "address" : ""
    }

  	console.log("Inside addCustomer Show:");
    $scope.awesome = true;
    $scope.addCustomerModal.show();
    $scope.popupOpen = false;
    $scope.popMessage = false; 
    $scope.isDisabled = false;
   /* if($("div.modal-wrapper")){
        $("div.modal-wrapper").height($("body").height());
        //alert("height set:");
    } else{
        alert("wrapper class not found:");
    }*/
    $scope.options.showError = false;
    $(".modal, .pane").height($scope.height);
    $(".modal, .pane").css("background","rgba(211,211,211,.8)");
  };

  $scope.closeAddCustomer = function() {
    console.log("Inside addCustomer Hide:");
    $scope.addCustomerModal.hide();
  }


  $ionicModal.fromTemplateUrl('updateCustomer.html', function(modal) {
  	console.log("----updateCustomer.html---");
    $scope.updateCustomerModal = modal;
    console.log("$scope.updateCustomerModal", $scope.updateCustomerModal);
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  var oldDataOfCustomer = {"name" :""};
  var editCustomerIndex = 0;  

  $scope.updateCustomer = function(customer,index) { 
    $scope.popupOpen = false;
            /*$scope.popupModal.show();*/
    $scope.popMessage = false; 
    $scope.isDisabled = false;
    /* alert("<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>:" + $("div.modal-wrapper").height($("body").height()));*/
  	console.log("Inside updateCustomerModal Show:");
  	console.log("customer,index:",customer,index);

    oldDataOfCustomer.name = $scope.allCustomers[index].name;    
    editCustomerIndex = index;
    console.log("oldDataOfCustomer name,editCustomerIndex:",oldDataOfCustomer.name ,editCustomerIndex);
  	$scope.updateCustomeData = customer;
    $scope.awesome = true;
  	console.log("$scope.updateCustomeData:",$scope.updateCustomeData);
    $scope.updateCustomerModal.show();
    //console.log("dynamic div:" ,$("div.modal-wrapper"));
    //alert("height before set:" +  $("div.modal-wrapper").height());
    /* if($("div.modal-wrapper")){
        $("div.modal-wrapper").height($("body").height());
        //alert("height set:");
      } else{
        alert("wrapper class not found:");
      }
   */
    $scope.options.showError = false;
    $(".modal, .pane").height($scope.height);
    $(".modal, .pane").css("background","rgba(211,211,211,.8)");
  }

  /*$scope.change = function(event){
    console.log("<<<<<<",event.keyCode);
    /*if(event.keyCode){
     $(".modal, .pane").height($scope.height);
     $(".modal, .pane").css("background","rgba(211,211,211,.8)");
   /* }

  }*/
  $scope.closeUpdateCustomer = function() {
    console.log("Inside updateCustomerModal Hide:");
    $timeout(function(){
      $scope.updateCustomerModal.hide();
    },100)
  
    console.log("$scope.oldDataOfCustomer,$scope.editCustomerIndex:",oldDataOfCustomer.name,editCustomerIndex);
    $scope.allCustomers[editCustomerIndex].name = oldDataOfCustomer.name;

    console.log("all customer array>>>>>>>" ,$scope.allCustomers);
  }

  $scope.isDisabled = false;
  $scope.submitAddCustomer = function() {
    $scope.options.showError = false;
    /*$(".modal, .pane").height($scope.height);
    $(".modal, .pane").css("background","rgba(211,211,211,.8)");*/
    console.log("Inside submitAddCustomer:",$scope.addCustomerData);
  	$scope.addCustomerData.name = $sanitize($scope.addCustomerData.name);
    $scope.addCustomerData.email = $sanitize($scope.addCustomerData.email);
    $scope.addCustomerData.address = $sanitize($scope.addCustomerData.address);

    console.log(">>>>>>>>>>>>>>>$scope.addCustomerData.name:",$scope.addCustomerData.name);
    console.log("$scope.addCustomerData.email:",$scope.addCustomerData.email);
    console.log("$scope.addCustomerData.address:",$scope.addCustomerData.address);

    console.log("-----------------------------------------------------------");
    if($scope.addCustomerData.name.length<3){
        console.log("Error:");
        $scope.options.showError = true;
        $scope.options.ErrorMessage = "Customer name must contain atleast 3 character";
        console.log("$scope.options.ErrorMessage:",$scope.options.ErrorMessage);
    }
    else if ($scope.addCustomerData.name && $scope.addCustomerData.email) {
      console.log("No Error:");
      var addCustomerPostData = {"userId":$scope.userId,"name":$scope.addCustomerData.name,"email":$scope.addCustomerData.email,"address":$scope.addCustomerData.address};
      CustomerDataService.addCustomerData(addCustomerPostData).then(function (data) {
           
            $scope.addedNewCustomer = data;
            console.log("addedNewCustomer Success:" + JSON.stringify(data));
            if(!$scope.allCustomers){
            	$scope.allCustomers = [];
            }
            console.log("Before remove array:" + JSON.stringify($scope.allCustomers));
            $scope.allCustomers.splice(0,0,data);
            console.log("$scope.allCustomers After customer Add:" + JSON.stringify($scope.allCustomers));
           /* var myPopup = $ionicPopup.show({
              title: 'Message',
              template: '<div><p ><b>Customer Added Successfully</b></p></div>'
            })
            myPopup.then(function(res){
              //console.log("alert response:" + res);
            });*/
            $scope.isDisabled = true;
            $scope.popupOpen = true;
            /*$scope.popupModal.show();*/
            $scope.popMessage = true; 
            $scope.poupmessage ="Customer Added Successfully";

            $timeout(function() {
               $scope.addCustomerModal.hide()
            },2000);
           /* $timeout(function() {
               
               myPopup.close(); //close the popup after 6 seconds for some reason
            }, 2000);
            $state.go('home.addCustomer');*/

         },function (err) {
           console.log("add customer error:" + JSON.stringify(err));
           $ionicLoading.hide();
           $scope.options.showError = true;
           $scope.options["ErrorMessage"] = err.data ? err.data : "Unknown error.";
      });  
      } else {
            $ionicLoading.hide();
            console.log("Error:");
            $scope.options.showError = true;
            $scope.options.ErrorMessage = "Customer Name  and Email are Required:";
            console.log("$scope.options.ErrorMessage:",$scope.options.ErrorMessage);
      } 
  }
  $scope.popupOpen = false;

  $scope.saveUpdateCustomer = function(updateCustomerNewData){
    $scope.options.showError = false;
  /* $(".modal, .pane").height($scope.height);
   $(".modal, .pane").css("background","rgba(211,211,211,.8)");*/
   /*alert("body height on add customer:" +$("body").height());*/
   console.log("updateCustomerNewData:",updateCustomerNewData);
   $scope.updateCustomerInfo ={};
   $scope.updateCustomerInfo.id = updateCustomerNewData._id;
   $scope.updateCustomerInfo.name =  $sanitize(updateCustomerNewData.name);
   $scope.updateCustomerInfo.email =  $sanitize(updateCustomerNewData.email);
   $scope.updateCustomerInfo.address =  $sanitize(updateCustomerNewData.address);
   if($scope.updateCustomerInfo.name.length<3){
        console.log("Error:");
        $scope.options.showError = true;
        $scope.options.ErrorMessage = "Customer name must contain atleast 3 character";
        console.log("$scope.options.ErrorMessage:",$scope.options.ErrorMessage);
    }
    else if($scope.updateCustomerInfo.name && $scope.updateCustomerInfo.email){
    
   	  var updatedCustomerDataObj = {"id":$scope.updateCustomerInfo.id,"name":$scope.updateCustomerInfo.name,"email":$scope.updateCustomerInfo.email,"address":$scope.updateCustomerInfo.address};
   	    CustomerDataService.updateCustomerData(updatedCustomerDataObj).then(function (data) {
            console.log("updatedCustomer Success:" + JSON.stringify(data));
            
            $scope.isDisabled = true;
            $scope.popupOpen = true;
            /*$scope.popupModal.show();*/
            $scope.popMessage = true; 
            $scope.poupmessage ="Customer update Successfully";

            $timeout(function() {
              $scope.updateCustomerModal.hide();
            },2000);
            // $scope.popupModal.hide();
            /*var myPopup = $ionicPopup.show({
              title: 'Message',
              template: '<div><p ><b>Customer Updated Successfully</b></p><div>'
            });
            myPopup.then(function(res){
              //console.log("alert response:" + res);
            });*/

            /*$timeout(function() {
               $scope.updateCustomerModal.hide();
               myPopup.close(); //close the popup after 6 seconds for some reason
            },2000);
*/
         },function (err) {
           $ionicLoading.hide();
           $scope.options.showError = true;
           $scope.options["ErrorMessage"] = err.data ? err.data[0] : "Unknown error.";
     });
   } else{
        $ionicLoading.hide();
        $scope.allCustomers[editCustomerIndex] = oldDataOfCustomer;
        $scope.options.showError = true;
        $scope.options.ErrorMessage = "Name And Email Must Not Be Blank:";
    }
 
  }


  $ionicModal.fromTemplateUrl('addCustomerDetails.html', function(modal) {
  	console.log("----addCustomerDetailsModal.html---");
    $scope.addCustomerDetailsModal = modal;
    console.log("$scope.updateCustomerModal", $scope.addCustomerDetailsModal);
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  $scope.addCustomerDetails = function(index) {
  	 console.log("index:",index);
  	 console.log("$scope.allCustomers:",$scope.allCustomers);
     console.log("$scope.allCustomers[index]:",$scope.allCustomers[index]);
      console.log("RelativeObj:",$scope.RelativeObj);
      $scope.RelativeObj["id"] = $scope.allCustomers[index]._id;
      console.log("RelativeObj after id:",$scope.RelativeObj);
     $scope.addCustomerDetailsModal.show();
  }

  $scope.closeaddCustomerDetails = function() {
    console.log("Inside updateCustomerModal Hide:");
    $scope.addCustomerDetailsModal.hide();
  }

 
  $scope.saveaddCustomerDetails = function() {
    console.log("Inside");
    console.log("$scope.RelativeObj.name:",$scope.RelativeObj.name);
     console.log("$scope.RelativeObj.name:",typeof($scope.RelativeObj.name));
    if (!$scope.RelativeObj.name || !$scope.RelativeObj.relation) {
    	console.log("error");
    	  $scope.options.showError = true;
        $scope.options.ErrorMessage = "Customer Relative Name  and relation To him are Required:";
    } else {
       console.log("data");
       var addCustomerDetailsPostData = {"id":$scope.RelativeObj.id,"name":$scope.RelativeObj.name,"relation": $scope.RelativeObj.relation};
       CustomerDataService.addCustomerDetails(addCustomerDetailsPostData).then(function (data) {
            console.log("addCustomerDetails Success:" + JSON.stringify(data));
            $scope.addCustomerDetailsModal.hide();

         },function (err) {
           $scope.options.showError = true;
           $scope.options["ErrorMessage"] = err.data ? err.data[0] : "Unknown error.";
        });

    }
   } 
   

}]);

