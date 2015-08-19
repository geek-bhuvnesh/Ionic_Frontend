Ionic_Frontend.factory("addCustomer",  ["$resource","ionicconfig", function($resource,ionicconfig) {
  /* return $resource("http://223.30.167.150:5500/addCustomer/:userId",{ userId: "@userId"},{*/
    /* return $resource("http://192.168.100.98:5500/addCustomer/:userId",{ userId: "@userId"},{*/
    return $resource(ionicconfig.url+":5500/addCustomer/:userId",{ userId: "@userId"},{
     save: {method:'POST', withCredentials:true}
   });
}]);

Ionic_Frontend.factory("updateCustomer",  ["$resource","ionicconfig",function($resource,ionicconfig) {
  /* return $resource("http://223.30.167.150:5500/updateCustomer/:customerId",{ customerId: "@customerId"}, */
   /* return $resource("http://192.168.100.98:5500/updateCustomer/:customerId",{ customerId: "@customerId"},*/
     return $resource(ionicconfig.url+":5500/updateCustomer/:customerId",{ customerId: "@customerId"},
      {
       update: {
           method: "PUT"
       }
   });
}]);

Ionic_Frontend.factory("addCustomerDetails",  ["$resource","ionicconfig",function($resource,ionicconfig) {
   /*return $resource("http://223.30.167.150:5500/addCustomerDetails/:customerId",{ customerId: "@customerId"},{*/
    //return $resource("http://192.168.100.98:5500/addCustomerDetails/:customerId",{ customerId: "@customerId"},{  
      return $resource(ionicconfig.url+":5500/addCustomerDetails/:customerId",{ customerId: "@customerId"},{
       update: {
           method: "PUT"
       }
   });
}]);

/*Ionic_Frontend.factory("getCustomers", ["$resource", function($resource) {
   return $resource("http://192.168.100.98:5500/allCustomers/:userId",{userId: "@userId"},
   {
      query: {method: 'GET', isArray: false }
   });
}]);*/

Ionic_Frontend.factory("getCustomers", ["$resource","ionicconfig",function($resource,ionicconfig) {
   /*return $resource("http://192.168.100.98:5500/allCustomers/:userId", {*/
    return $resource(ionicconfig.url+":5500/allCustomers/:userId:/:type", {
       userId: '@userId',
       type: '@type'
   }, {});
}]);


Ionic_Frontend.factory("CustomerDataService", ["$http", "$q", "addCustomer","updateCustomer","addCustomerDetails","getCustomers",function($http, $q, addCustomer,updateCustomer,addCustomerDetails,getCustomers) {
   var customerData = {};
   var selected;
   return {
        addCustomerData: function(customer) {
          console.log("addCustomerData Data Factory:" + JSON.stringify(customer));
           var defer = $q.defer();
           try {
               addCustomer
                   .save({
                       userId: customer.userId,
                       name: customer.name, 
                       email: customer.email,
                       address: customer.address
                   }, function(resp) {
                       console.log(JSON.stringify(resp));
                       customerData = resp;
                       defer.resolve(customerData);
                   }, function(err) {
                       customerData = {};
                       defer.reject(err);
                       console.log(err);
                   });
           } catch (e) {
               console.log(e.stack);
               customerData = {};
               defer.reject({});
           }
           return defer.promise;
       },
       updateCustomerData: function(customerData) {
         var defer = $q.defer();
           console.log("---updatecustomerData START", customerData)
           try {
               updateCustomer
                   .update({
                    "customerId": customerData.id,
                    "name":customerData.name,
                    "email":customerData.email,
                    "address":customerData.address
                   }, function(resp) {
                       customerData = resp;
                       defer.resolve(customerData);
                   }, function(err) {
                       customerData = {};
                       defer.reject(err);
                       console.log(err);
                   });
           } catch (e) {
               console.log(e.stack);
               customerData = {};
               defer.reject({});
           }
           return defer.promise;         
       },
        addCustomerDetails: function(customerDetails) {
           console.log("addCustomerDetails Factory:" + JSON.stringify(customerDetails));
           var defer = $q.defer();
           try {
               addCustomerDetails
                   .update({
                       "customerId": customerDetails.id,
                       "name": customerDetails.name, 
                       "relation": customerDetails.relation
                   }, function(resp) {
                       console.log(JSON.stringify(resp));
                       customerData = resp;
                       defer.resolve(customerData);
                   }, function(err) {
                       customerData = {};
                       defer.reject(err);
                       console.log(err);
                   });
           } catch (e) {
               console.log(e.stack);
               customerData = {};
               defer.reject({});
           }
           return defer.promise;
       },
        fetchCustomers: function(userId,type) {
           var defer = $q.defer();
           console.log("userId in factory:" + userId);
           console.log("userId in factory:" + typeof userId);
           try {
               getCustomers
                   .query({
                       userId: userId,
                       type: type
                   },function(resp) {
                      defer.resolve(resp);
                   },function(err) {
                       defer.reject({});
                       console.log(err);
                   });
           } catch (e) {
               console.log(e.stack);
               defer.reject({});
           }
           return defer.promise;
       }
   }
}]);