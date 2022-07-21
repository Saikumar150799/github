app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'./index.html',
        controller:'mainCtrl'
    })
    .when('/user/:name',{
        templateUrl:'./user.html',
        controller:'userCtrl'
    })
    .otherwise({
        redirectTo:'/'
    })
})

