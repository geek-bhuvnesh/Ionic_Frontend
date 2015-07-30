Ionic_Frontend.factory("forgetPwd", ["$resource", function($resource) {
   //console.log("ionicconfig.url forget password:",ionicconfig.url);
   /*return $resource("http://223.30.167.150:5500/forgotpassword/:emailid", {*/
    return $resource("http://192.168.100.98:5500/forgotpassword/:emailid", {
     emailid: '@emailid'
   },{});
}]);

Ionic_Frontend.factory("forgetPwdData", ["$http", "$q", "forgetPwd", function($http, $q, forgetPwd) {
   var userData = {};
   var selected;
   return {
        forgetPasswordFn: function(emailid) {
           var defer = $q.defer();
           try {
               forgetPwd
                   .get({
                       emailid: emailid
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