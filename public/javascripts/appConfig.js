var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {
    //var location = $locationProvider.path().split('/');
    //location.shift();
    //location.join('/');


    $routeProvider.when('/', {
      templateUrl: '/pages/home.html',
      controller: 'homeCtrl'
    }).
    when('/register', {
      templateUrl: '/pages/register.html',
      controller: 'registerCtrl'
    }).
    when('/bridge', {
      templateUrl: '/pages/bridge.html',
      controller: 'bridgeCtrl'
    }).
    when('/band', {
      templateUrl: '/pages/band.html',
      controller: 'bandCtrl'
    }).
    when('/login', {
      templateUrl: '/pages/login.html',
      controller: 'loginCtrl'
    }).
    when('/bridge/:user', {
      templateUrl: '/pages/bridge.html',
      controller: 'bridgeCtrl'
    }).
    otherwise({
      redirectTo: '/bridge'
    });
    //.when('/news', {
    //  templateUrl: '/pages/news.html',
    //  controller: 'newsCtrl'
    //}).when('/events', {
    //  templateUrl: '/pages/events.html',
    //  controller: 'eventsCtrl'
    //}).when('/music', {
    //  templateUrl: '/pages/music.html',
    //  controller: 'musicCtrl'
    //}).when('/photos', {
    //  templateUrl: '/pages/photos.html',
    //  controller: 'photosCtrl'
    //}).when('/videos', {
    //  templateUrl: '/pages/videos.html',
    //  controller: 'videosCtrl'
    //})

    $httpProvider.interceptors.push('authInterceptor');
  }]);