app.controller('mainCtrl', function ($scope) {
})


app.controller('allUsers', function ($scope, $http) {
    $http.get('https://api.github.com/users')
        .then(function (response) {
            $scope.allUsers = response.data
            // console.log("ALL-Users",$scope.allUsers)
        }), function (err) {
            console.log("err", err)
        }

        

})
app.controller('userCtrl', function ($scope, $http, $routeParams) {
    $http({
        method: 'GET',
        url: `https://api.github.com/users/${$routeParams.name}`,
    }).then(function (response) {
        $scope.user = response.data
        // console.log("user", $scope.user)
    }), function (err) {
        console.log("err", err)
    }
    $http.get(`https://api.github.com/users/${$routeParams.name}/repos`)
        .then(function (res) {
            $scope.repositories = res.data
            // console.log("repo", $scope.repositories)
        })
})