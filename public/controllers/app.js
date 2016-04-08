var myApp = angular.module('myApp',[]);

myApp.controller('mainController',['$scope', '$http', function($scope, $http){

   $scope.send = function(){
     $http.post('/send',$scope.contact)
     .success(function(res){

     });
       console.log($scope.contact);
   }

}]);
