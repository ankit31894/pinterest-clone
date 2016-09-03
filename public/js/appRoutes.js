angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/allimgs.html',
        controller: 'AllImgsController'
   })
    .when('/mypics', {
        templateUrl: 'views/myimgs.html',
        controller: 'MyImgsController'
   })
    .when('/profile/:string', {
        templateUrl: 'views/allimgs.html',
        controller: 'OtherImgsController',
    })
    .when('/mylinks', {
        templateUrl: 'views/allimgs.html',
        controller: 'LinkImgsController',
    })
    .when('/login/twitter', {
        controller : function(){
            window.location.replace('/login/twitter');
        },
        template : "<div></div>"
    })
    .when('/logout', {
        controller : function(){
            window.location.replace('/logout');
        },
        template : "<div></div>"
    });

    $locationProvider.html5Mode(true);

}]);
