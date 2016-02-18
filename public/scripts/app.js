'use strict';
//Declare app level module which depends on filters, and services


angular.module('servicesModule',[]);
angular.module('modelsModule',[]);
var app = angular.module('myApp', ['ngRoute','servicesModule','modelsModule']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {templateUrl: 'views/addPostView.html', controller: 'postCtrl'});
    $routeProvider.when('/register', {templateUrl: 'views/registrationView.html', controller: 'userCtrl'});
    $routeProvider.when('/login', {templateUrl: 'login.html'});
    //$routeProvider.when('/addJob', {templateUrl: 'views/addJobView.html', controller: 'addJobCtrl'});


   //$routeProvider.otherwise({redirectTo: '/newsfeed'});

}]);

