var mainApp=angular.module('AccCtrl', []);
mainApp.controller('AccountController', function($scope,$http,$location,myhttp) {
  $scope.formdata={
    name:'',
    city:'',
    state:''
  };
  ($scope.update=function(){
      $scope._update=true;  //start from _ means loading flag for that function name
      $scope.E_update="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/updateprofile',method:'POST',data:{info:$scope.formdata}
      }).then(function(d){
        $scope.formdata=d;
        $scope.C_update='Updated!';
      },function(err){
          $scope.E_update=err;
      }).finally(function(){
          $scope._update=false;
      });
  })();
});


mainApp.factory('myhttp', function($http,$q) {

   return {
        fetch: function(req) {
            var deferred = $q.defer();
             //return the promise directly.
             $http(req)
               .then(function(result) {
                    deferred.resolve(result.data)
                },function(err){
                    deferred.reject(err.data)
                });
            return deferred.promise;

        }
   }
});
