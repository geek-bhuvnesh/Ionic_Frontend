Ionic_Frontend.factory("resetPwd", ["$resource", function($resource) {
   return $resource("http://223.30.167.150:5500/resetpassword/:reset_pass_token/:emailid", {
  // return $resource("http://54.201.235.119:3000/resetpassword/:fp_code/:emailid", {
     reset_pass_token: '@reset_pass_token',
     emailid: '@emailid'
   },{});
}]);


Ionic_Frontend.factory("resetPwdData", ["$http", "$q", "resetPwd", function($http, $q, resetPwd) {
   var userData = {};
   var selected;
   return {
        resetPasswordFn: function(data) {
          console.log("resetPasswordFn factory:"+JSON.stringify(data));
           var defer = $q.defer();
           try {
               resetPwd
                   .save({
                       reset_pass_token: data.reset_pass_token,
                       emailid: data.emailid,
                       new_password : data.password,
                       confirm_password : data.confirm_password
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