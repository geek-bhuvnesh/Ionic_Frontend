// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
/*angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
/*angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Ionic_Frontend = angular.module('IonicFrontend', ['ionic','ngResource','ngCordova','ngSanitize','ngCookies','ngTouch'])

Ionic_Frontend.run(function($ionicPlatform,$cordovaSplashscreen,$location,$rootScope,$ionicLoading,$cordovaDevice,$cordovaDialogs) {
  
   
  $ionicPlatform.ready(function() {
    console.log("Inside Run:");
    $rootScope.$on('loading:show',function(){
       console.log("Inside Loading Show:");
       $ionicLoading.show({template:'<p>Loading...</p><ion-spinner></ion-spinner>'})
       /*$ionicLoading.show({template:'<ion-spinner></ion-spinner>'})*/
    })
    $rootScope.$on('loading:hide',function(){
        //console.log("Inside Loading Hide:" + JSON.stringify(data));
       // console.log("Data.count:" + data.count);
        //if(data.count!=9){
          $ionicLoading.hide();
        //}
    })



    //if (window.Connection) {
       
    //} 
   /* setTimeout(function() {
        $cordovaSplashscreen.hide()
     }, 3000)*/
    //console.log("1:");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
     //navigator.splashscreen.show();
     if(navigator.splashscreen) {
        navigator.splashscreen.hide();
     }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      console.log("works!");
    }else {
      //console.log("nopes");
    }
    if(window.StatusBar) {
      //console.log("3:");
      StatusBar.styleDefault();
    }
    ionic.Platform.isFullScreen = true;
    try {
        navigator.splashscreen.hide();
    } catch (e) {

    }
    /* $location.path('/login');
     $rootScope.$apply();*/
    }); 
})

Ionic_Frontend.factory('localstorageFactory', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key];
    },
    setObject: function(key, value) {
      console.log("Inside Setonject method factory:")
      console.log("Inside Setonject method factory key:" +key);
      console.log("Inside Setonject method factory value:" +JSON.stringify(value));
      //serialize it using the JSON.stringify function as HTML5 localStorage only store string
      $window.localStorage[key] = JSON.stringify(value); 
    },
    getObject: function(key) {
      //unserialize it using the JSON.parse before using it
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);


Ionic_Frontend.config(function($stateProvider,$urlRouterProvider, $cordovaInAppBrowserProvider, $ionicConfigProvider,$sceDelegateProvider,$httpProvider){
   /*$ionicConfigProvider.views.maxCache(10);*/
   /*$ionicConfigProvider.views.swipeBackEnabled(false);*/
   $ionicConfigProvider.views.maxCache(0);

    /*$ionicConfigProvider.platform.android.views.maxCache(5);
    iew does not updated on state change as controller not load */

    /*$sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our other assets domain.  Notice there is a difference between * and **.
        'http://km.support.apple.com/**',
    ]);
    */
   /*$httpProvider.interceptors.push(function($rootScope){
      var countValue =0;
      console.log("inside http provider:");
       return {
          request:function(config){
             $rootScope.$broadcast('loading:show');
             //console.log("config Request:",config);
             return config;
          },
          response:function(config){
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>countValue:" + countValue);
             $rootScope.$broadcast('loading:hide',{
               'count': countValue
             });
             countValue++;
             //console.log("config Response:",config);
             return config;
          }
       }
    });*/

   $stateProvider.state('/',{
       url:'/',
       templateUrl:'screens/login-screen/login.html',
       controller:'LoginController'
    }).state('login', {
        url: '/login',
        templateUrl: 'screens/login-screen/login.html',
        controller: 'LoginController'
    }).state('register', {
        url: '/register',
        templateUrl: 'screens/register-screen/register.html',
        controller: 'RegistrationController'
    }).state('home',{
        //abstract: true,
        url:'/home/:userId',
        templateUrl: 'screens/home-screen/home.html',
        resolve: {
                Customers:  function($http,$stateParams,CustomerDataService) {
                 /*return $http({method: 'GET', url: '/http://192.168.100.98:5500/allCustomers/' + $stateParams.userId}).then (function (data) {
                  console.log("customers:" + JSON.stringify(data));
                    //return data;
                 });*/
                return CustomerDataService.fetchCustomers($stateParams.userId);
               }        
        },
        controller: 'HomeController',
    })
    /*.state('home.addCustomer',{
        url:'/addCustomer',
        templateUrl:'screens/home-screen/addCustomer.html'
    })*/
    .state('forgetpassword',{
        url:'/forgetpassword',
        templateUrl:'screens/forget_password/forgetpassword.html',
        controller: 'forgetPwdCtrl'
    }).state('resetPassword', {
        url:  '/resetPassword/:reset_pass_token/:email_id',
        templateUrl: 'screens/reset_password/resetpassword.html',
        controller: 'resetPwdCtrl'
    }).state('settings',{
        //cache: false,
        url:  '/setting',
        templateUrl: 'screens/settings/settings.html',
        controller: 'SettingController'
    }).state('popup',{
        url: '/popup',
        templateUrl: 'screens/popuppractice/popup.html',
        controller: 'PopupCtrl'
    })
 
    /*var defaultOptions = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };
    document.addEventListener(function () {
       $cordovaInAppBrowserProvider.setDefaultOptions(options);
       alert("options:" + JSON.stringify(options));
    },false);*/

    $urlRouterProvider.otherwise('/');
/*
       setTimeout(function() {
         $state.go('login');
       }, 10000);
*/
    //$httpProvider.interceptors.push('loadingInterceptor');

    
});


