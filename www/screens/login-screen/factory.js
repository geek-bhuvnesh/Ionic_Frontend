/*Ionic_Frontend.factory("login", ["$resource", function($resource) {
   //console.log("ionicconfig.url:",ionicconfig.url);
//localhost
   return $resource("http://127.0.0.1:5000/login", {
  // return $resource("http://54.201.235.119:3000/login", {
   },{
     save: {method:'POST', withCredentials:true}
   });
}]);*/

Ionic_Frontend.factory("login",["$resource",function($resource) {
   //console.log("ionicconfig.url:",ionicconfig.url);
//localhost
   /*return $resource("http://192.168.100.44:5500/login", {*/
 /*    return $resource("http://223.30.167.150:5500/login", {*/
  // return $resource("http://54.201.235.119:3000/login", {
        return $resource("http://192.168.100.98:5500/login", {
         /* return $resource("http://localhost:5500/login", {*/
   },{
     save: {method:'POST', withCredentials:true}
   });
}]);


Ionic_Frontend.factory("LoginDataService", ["$http", "$q", "login", function($http, $q, login) {
   var userData = {};
   var selected;
   return {
        fetchLoginData: function(user) {
          console.log("User Login Data Factory:" + JSON.stringify(user));
           var defer = $q.defer();
           try {
               login
                   .save({
                       email: user.emailid,
                       password: user.password
                   }, function(resp) {
                       console.log(JSON.stringify(resp));
                       userData = resp;
                       defer.resolve(userData);
                   }, function(err) {
                       userData = {};
                       defer.reject(err);
                       console.log(err);
                   });
           } catch (e) {
               console.log(e.stack);
               userData = {};
               defer.reject({});
           }
           return defer.promise;
       }
   }
}]);