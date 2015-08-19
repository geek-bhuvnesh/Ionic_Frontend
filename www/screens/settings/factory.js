Ionic_Frontend.factory("changePwd", ["$resource","ionicconfig", function($resource,ionicconfig) {
   /*return $resource("http://192.168.100.44:5500/changepassword/:userId", {*/
   return $resource(ionicconfig.url+":5500/changepassword/:userId", {
     userId: '@userId'
   },{
      save: {method:'POST', withCredentials:true}
   });
}]);


Ionic_Frontend.factory("changePwdData", ["$http", "$q", "changePwd", function($http, $q, changePwd) {
   var userData = {};
   var selected;
   return {
        changePasswordFn: function(userId, changePasswordData) {
          console.log("userId factory:",userId);
          console.log("changePasswordData factory:",changePasswordData);
           var defer = $q.defer();
           try {
               changePwd
                   .save({
                       userId: userId,
                       new_password:changePasswordData.new_password,
                       old_password:changePasswordData.current_password,
                       withCredentials:true
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