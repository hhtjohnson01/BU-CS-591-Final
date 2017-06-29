/**
 * Created by henryjohnson on 6/22/17.
 */
angular.module('FighterFeed', ['ngRoute', 'ngCookies'])
    .directive('nameDisplay', function () {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"
        }
    })
    .controller('mainctrl', function ($scope, $http, $cookies) {

        $scope.initApp = function ( ) {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = true
            $scope.getFighter()
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    name: $scope.name,
                    username: $scope.email,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    username: $scope.email,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        }

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        }

        $scope.doTwitterAuth = function () {
            var openUrl = '/authTwitter/callback/'
            //Total hack, this:
            $scope.authorized = true
            $scope.showLogin = false
            window.location.replace(openUrl)

        }

    })
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/:status', {
                    templateUrl: '',
                    controller: 'authController'
                })
                .when(':status', {
                    templateUrl: '',
                    controller: 'authController'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }])


    .controller('authController', function ($scope) {

        let authStatus =  $location.search();
        console.log(authStatus)
        console.log('In authController')
        $scope.authorized = !!authStatus

    })

    //This controller handles the displaying of details in the user list by calling the API in the backend.
    .controller('fighterController', function ($scope, $http) {
        //READ (GET) the fighter name and use this to send to the back end for search the mma database.
        $scope.getFighter = function (fighter) {
            const request = {
                method: 'get',
                url: 'http://localhost:3000/fighter/' + $scope.fighter,
                data: {
                    name: $scope.fighter
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.fighter = response.data
                })
        }
    })