/**
 * Created by AVALON on 12/9/15.
 */
var app = angular.module('myApp', ['ngRoute']);

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
      when('/bridge' + 'asdf', {
        templateUrl: 'private/pages/bridge.html',
        controller: 'bridgeCtrl'
      }).
      when('/login', {
          templateUrl: 'pages/login.html',
          controller: 'loginCtrl'
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

app.controller ('homeCtrl', ['$scope', function ($scope){
  $scope.message = 'Welcome to the Home Page.';
}]);

app.controller('newsCtrl', ['$scope', function($scope){
  $scope.message = "Welcome to the News Page";
}]);

app.controller('musicCtrl', ['$scope', function($scope){
  $scope.message = "Welcome to the Music Page";
}]);

app.controller('eventsCtrl', ['$scope', function($scope){
  $scope.message = "Welcome to the Events Page";
}]);

app.controller('photosCtrl', ['$scope', function($scope){
  $scope.message = "Welcome to the Photos Page";
}]);

app.controller('videosCtrl', ['$scope', function($scope){
  $scope.message = "Welcome to the Videos Page";
}]);

app.controller('bridgeCtrl', ['$scope', '$http', 'authService', '$location', function ($scope, $http, authService, $location) {
  $scope.message = "Welcome to HELL!";

  //finds last part of url path
  $scope.url = $location.path().split('/');
  $scope.url = $scope.url[$scope.url.length-1];
  $http({
    url: '/users/' + $scope.url,
    method: 'get'
  }).then(function (response) {
    $scope.tests = response.data.username;
  });
}]);

app.controller('newsCtrl', ['$scope', function ($scope) {
  $scope.message = "WASSUP!";
}]);

app.controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.submit = function () {
    $http.post('api/register', $scope.form)
      .then(function (response) {
        console.log(response);
        $location.path('/login')
      });
  }
}]);
app.controller('loginCtrl', ['$scope', '$http', 'authService', '$location',
  function ($scope, $http, authService, $location) {
    $scope.submit = function () {
      $http.post('api/login', $scope.form)
        .then(function (response) {

          // save json web token in session storage
          authService.saveToken(response.data);

          // redirect to projects page
          $location.path('/bridge');
        }, function () {
          // wipe out the stored token
          authService.logout();
        })
    };
  }]);

app.controller('navCtrl', ['authService', '$scope', '$location',
  function (authService, $scope, $location) {

    $scope.user = authService.getUser();

    authService.observeUser().then(null, null, function(user){
      $scope.user  = user;
    });


    $scope.logout = function () {
      authService.logout();
      $location.path('/');
    };

  }]);

app.service('authService', ['$window', '$q', function ($window, $q) {

  var self = this;
  this.user = {};
  var defer = $q.defer();

  // This exposes the user object as a promise.
  // First two arguments of then are success and error callbacks, third one is notify callback.
  this.getUser = function () {
    self.setUser();
    return self.user;
  };

  this.observeUser = function() {
    return defer.promise;
  };

  this.setUser = function () {
    self.user = self.parseJwt(self.getToken());
    defer.notify(self.user);
  };

  this.parseJwt = function (token) {
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    } else return {};
  };

  this.saveToken = function (token) {
    $window.localStorage.jwtToken = token;
    self.setUser();
  };

  this.getToken = function () {
    return $window.localStorage.jwtToken;
  };

  this.isAuthed = function () {
    var token = this.getToken();
    if (token) {
      var params = self.parseJwt(token);
      var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;

      // if the user is expired, log them out
      if (!notExpired) {
        self.logout();
      }
      return notExpired;
    } else {
      return false;
    }
  };

  this.logout = function () {
    delete $window.localStorage.jwtToken;
    self.setUser();
  };
}]);

app.factory('authInterceptor', ['$q', '$location', 'authService', function ($q, $location, authService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (authService.isAuthed()) {
        config.headers.Authorization = 'Bearer ' + authService.getToken();
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {

        // delete the token
        authService.logout();

        // handle the case where the user is not authenticated
        $location.path("/login");
      }
      return response || $q.when(response);
    }
  };
}]);