app.controller('mainCtrl', function ($scope) {
})


app.controller('allUsers', function ($scope, $http) {
    $scope.arr;
    $scope.temp = []
    $scope.startIndex = 0
    $scope.endIndex = 10

    $http.get('https://api.github.com/users')
        .then(function (response) {
            $scope.allUsers = response.data
            $scope.temp = response.data.slice(0, 10) //INITIALLY 10 USERS ON PAGE
            $scope.allUsers = $scope.temp
        }), function (err) {
            console.log("err", err)
        }

    $scope.load = function () {
        $http.get('https://api.github.com/users')
            .then(function (response) {
                $scope.arr = response.data
            })
    }

    $scope.currentPage = 0
    // FUNCTION TO CHANGE START AND END INDEX NUMBER
    function updatePage(currentPage) {
        return $scope.currentPage = ($scope.currentPage + 1) * 1 + 10 - 1
    }

    // SCROLL DOWN FUNCTION
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        if (scrolled === scrollable) {
            if ($scope.currentPage <= 30) {
                $scope.load()
                $scope.arr ? $scope.arr.slice($scope.startIndex, $scope.endIndex).forEach(element => {
                    $scope.temp.push(element)
                }) : "";
                $scope.startIndex = $scope.endIndex
                $scope.endIndex = updatePage($scope.currentPage)
            }
        }
    })
})



app.controller('userCtrl', function ($scope, $http, $routeParams) {
    $http({
        method: 'GET',
        url: `https://api.github.com/users/${$routeParams.name}`,
    }).then(function (response) {
        $scope.user = response.data

    }), function (err) {
        console.log("err", err)
    }
    $http.get(`https://api.github.com/users/${$routeParams.name}/repos`)
        .then(function (res) {
            $scope.repositories = res.data
        })
})