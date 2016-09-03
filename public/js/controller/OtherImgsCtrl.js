var mainApp=angular.module('OtherImgsCtrl', ['wu.masonry']);
mainApp.controller('OtherImgsController',['$scope','$http','$routeParams','myhttp' ,function($scope,$http,$routeParams,myhttp) {
  $scope.twitterId = $routeParams.string;
  ($scope.getImgs=function(){
      $scope.Imgs=[];
      $scope._getImgs=true;  //start from _ means loading flag for that function name
      $scope.E_getImgs="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getotherimgs',method:'POST',data:{id:$scope.twitterId}
      }).then(function(d){
          $scope.Imgs=d;
          console.log(d)
      },function(err){
          $scope.E_getImgs=err;
      }).finally(function(){
          $scope._getImgs=false;
      });
  })();
  $scope.linkImg=function(val){
      $scope._linkImg=true;  //start from _ means loading flag for that function name
      $scope.E_linkImg="";  //start from E_ means error string for that function name
      if(val.linked)
        myhttp.fetch({
            url:'/unlinkimg',method:'POST',data:{id:val._id}
        }).then(function(d){
          console.log(d)
          if(d.nModified==1){
            val.linkersno--;
            val.linked=false;
          }
        },function(err){
            $scope.E_linkImg=err;
        }).finally(function(){
            $scope._linkImg=false;
        });
      else
        myhttp.fetch({
            url:'/linkimg',method:'POST',data:{id:val._id}
        }).then(function(d){
          console.log(d)
          if(d.nModified==1){
            val.linkersno++;
            val.linked=true;
          }
        },function(err){
            $scope.E_linkImg=err;
        }).finally(function(){
            $scope._linkImg=false;
        });


  };


}]);


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
