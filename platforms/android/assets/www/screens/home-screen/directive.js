Ionic_Frontend.directive('capitalizeFirst', function($parse) {
   return {
   /*  restrict: 'AEC',*/
     require: 'ngModel',
     link: function(scope, element, attrs, HomeController) {
        console.log("scope:",scope);
        console.log("element:",element);
        console.log("attrs:",attrs);
        console.log("HomeController:",HomeController);
        var capitalize = function(inputValue) {
          console.log("Inside capitalize function,inputValue:",inputValue);
           if (inputValue === undefined) { 
            inputValue = '';
           }
           /*var capitalized = inputValue.charAt(0).toUpperCase() +
                             inputValue.substring(1);*/
           /* var capitalized = inputValue.split(' ').reduce(function(prevValue, word){
                return  prevValue + word.substring(0, 1).toUpperCase() + word.substring(1) + ' ';
            }, '');*/
           array = inputValue.split(' ');
           var capitalized ="";
           array.forEach(function(value){
               if(capitalized){
                    capitalized = capitalized +" "+value.charAt(0).toUpperCase()+value.substring(1);
               }else{
                    capitalized = capitalized+value.charAt(0).toUpperCase()+value.substring(1);
               }
            });
           console.log("capitalized:",capitalized);                  
           if(capitalized !== inputValue) {
              HomeController.$setViewValue(capitalized);
              HomeController.$render();
            }         
            return capitalized;
         }
         console.log("capitalize:",capitalize);
         HomeController.$parsers.push(capitalize);
         capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
     }
   };
});

