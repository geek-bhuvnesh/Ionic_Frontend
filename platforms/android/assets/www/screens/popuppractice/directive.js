Ionic_Frontend.directive('popup',function(){

  var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */

    /*directive.template = "<ion-view><ion-header-bar><p>Pop Up</p></ion-header-bar><ion-content scroll="false">
     <button class="button button-dark" ng-click="showPopup()">show</button><button class="button button-primary" ng-click="showConfirm()">
     Confirm</button><button class="button button-positive" ng-click="showAlert()">Alert</button></ion-content> 
    </ion-view>";*/
    directive.template = "<p>I am Bhuvnesh</p>";

    return directive;
});