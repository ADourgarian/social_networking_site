/**
 * Created by AVALON on 12/9/15.
 */
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

app.controller ('homeCtrl', ['$scope', function ($scope){
  $scope.message = 'Welcome to the Home Page.';
}]);

//app.controller('newsCtrl', ['$scope', function($scope){
//  $scope.message = "Welcome to the News Page";
//}]);
//
//app.controller('musicCtrl', ['$scope', function($scope){
//  $scope.message = "Welcome to the Music Page";
//}]);
//
//app.controller('eventsCtrl', ['$scope', function($scope){
//  $scope.message = "Welcome to the Events Page";
//}]);
//
//app.controller('photosCtrl', ['$scope', function($scope){
//  $scope.message = "Welcome to the Photos Page";
//}]);
//
//app.controller('videosCtrl', ['$scope', function($scope){
//  $scope.message = "Welcome to the Videos Page";
//}]);
//app.controller('newsCtrl', ['$scope', function ($scope) {
//  $scope.message = "WASSUP!";
//}]);

app.controller('bridgeCtrl',['$scope', '$http', '$routeParams', 'authService', '$location', 'Upload',
  function($scope, $http, $routeParams, authService, $location, Upload){
    $scope.currentUser = authService.getUser().username; //set var for logged ßin user
    // determine where to send user.
    if ($routeParams.user){ // if entered param, direct to that profile.
      $scope.url = $routeParams.user;
    } else if (authService.getUser()){ // if no param, but is logged in, direct to their user
      $scope.url = $scope.currentUser;
    } else {
      $location.path('/')
    } // if neither, send to home

    $scope.instruments = [
      {name: 'Acoustic Guitar', plays: false},
      {name: 'Background Singer', plays: false},
      {name: 'Bass Guitar', plays: false},
      {name: 'Keyboard Lead', plays: false},
      {name: 'Guitar Other', plays: false},
      {name: 'Piano Rhythm', plays: false},
      {name: 'Guitar Saxophone', plays: false},
      {name: 'Steel Guitar', plays: false},
      {name: 'Trombone Trumpet', plays: false},
      {name: 'Ukulele Vocalist', plays: false},
      {name: 'Vocalist: Alto', plays: false},
      {name: 'Vocalist: Baritone', plays: false},
      {name: 'Vocalist: Bass', plays: false},
      {name: 'Vocalist: Soprano', plays: false},
      {name: 'Vocalist: Tenor', plays: false}
    ];

    $scope.genres = [
      {name: 'Acoustic', plays: false},
      {name: 'Classic Rock', plays: false},
      {name: 'Dubstep', plays: false},
      {name: 'Heavy Metal', plays: false},
      {name: 'Punk', plays: false},
      {name: 'Alternative', plays: false},
      {name: 'Celtic', plays: false},
      {name: 'Classical', plays: false},
      {name: 'Electronic', plays: false},
      {name: 'Hip Hop', plays: false},
      {name: 'Other', plays: false},
      {name: 'R&B', plays: false},
      {name: 'Southern Rock', plays: false},
      {name: 'Bluegrass', plays: false},
      {name: 'Gospel', plays: false},
      {name: 'Country', plays: false},
      {name: 'Folk', plays: false},
      {name: 'Jazz', plays: false},
      {name: 'Pop', plays: false},
      {name: 'Reggae', plays: false},
      {name: 'World', plays: false},
      {name: 'Blues', plays: false},
      {name: 'Cover/Tribute', plays: false},
      {name: 'Funk', plays: false},
      {name: 'Latin', plays: false},
      {name: 'Progressive', plays: false},
      {name: 'Rock', plays: false}
    ];

    // get profile based on query.
    function getUserInfo() {
      $http({
        url: '/users/' + $scope.url,
        method: 'get'
      }).then(function (response) {
        if (response.data){
          console.log(response.data);
          $scope.username = response.data.username;
          $scope.userInfo = response.data;
          $scope.editable = $scope.userInfo.editable;
          $scope.fullName = $scope.userInfo.firstName + ' ' + $scope.userInfo.lastName;
          $scope.profilePic = $scope.userInfo.profilePic;

          // pre-fill form.
          $scope.fillCheckboxes($scope.editable.instrumentsPlayed, $scope.instruments);
          $scope.fillCheckboxes($scope.editable.genresPlayed, $scope.genres);
        } else {
          $location.path('/');
        }
      });
    }

    getUserInfo();

    // form settings
    $scope.openForm = false;
    $scope.changeProfilePic = false;
    $scope.editForm = function(){
      if ($scope.openForm === false) {
        $scope.openForm = true;
      } else {
        getUserInfo();
        $scope.openForm = false;
      }
    };

    $scope.profilePicButton = 'Change Profile Pic';
    $scope.editPic = function(){
      if ($scope.changeProfilePic === false){
        $scope.changeProfilePic = true;
        $scope.profilePicButton = 'Done Editing'
      } else {
        getUserInfo();
        $scope.changeProfilePic = false;
        $scope.profilePicButton = 'Change Profile Pic'
      }
    };
    //$scope.toggleContent = function(content){
    //  if (content === false) {
    //    content = true;
    //  } else {
    //    getUserInfo();
    //    content = false;
    //  }
    //};

    // somewhat convoluted way of checking boxes if they are in the user's played arrays.
    $scope.fillCheckboxes = function(played,listOf){
      played.forEach(function(itemPlayed){
        listOf.forEach(function(itemPossible, itemPossibleNumber){
          // if an item is played, set its "plays" field to true in the list of items.
          if (itemPlayed === itemPossible.name){listOf[itemPossibleNumber].plays = true}
          else { listOf.plays = false}
        })
      });
      return listOf
    };

    // set true or false for checkbox items in item list arrays
    $scope.click = function(object){
      if (object.plays === true){
        object.plays = false;
      } else if (object.plays === false){
        object.plays = true;
      }
    };

    $scope.file_changed = function(element) {

      $scope.$apply(function(scope) {
        var photofile = element.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          // handle onload
        };
        reader.readAsDataURL(photofile);
      });
    };

    //$('.profilePicForm').on('submit',function(event){
    //  event.preventDefault();
    //  alert('hello');
    //  console.log($(this).serializeArray());
    //});


    // upload later on form submit or something similar
    $scope.submitProfilePic = function(){
      console.log($scope.username);
      Upload.upload({
        url: '/pictures/profile/'+ $scope.username,
        method: 'post',
        data: $scope.upload,
        dataType: 'formData'
      }).then(function (response) {
        console.log(response.data);
       // $scope.uploads.push(response.data);
        $scope.upload = {};
      })
    };

    $scope.submit = function () {

      $scope.editable.instrumentsPlayed = []; // reset instrumentsPlayed list
      $scope.editable.genresPlayed = []; // reset genresPlayed list

      $scope.editable.instrumentsPlayed = newPlayedList($scope.instruments); // recreate instrumentsPlayed
      $scope.editable.genresPlayed = newPlayedList($scope.genres); // recreate genresPlayed

      $http.put('/users/' + $scope.username, $scope.userInfo) // send new editable to server
        .then(function (response) {
          console.log(response);
        });
    }
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

app.controller('searchCtrl',['$scope', '$http', '$location', function($scope, $http, $location){

  var myTimer;

  // initiates search 1 second after last keypress
  $scope.searchQueue = function(){
    clearTimeout(myTimer);
    myTimer = setTimeout(function(){
      $scope.entry();
    },2000);
  };

  $scope.navigate = function(username){
    console.log(username);
   // $location.path('/bridge/'+username);
  };

  $scope.entry = function(){
    $http({
      url: '/search/' + $scope.query,
      method: 'get'
    }).then(function (response) {
      if (response.data){
        $scope.userList = response.data;
      } else {
        $scope.message = 'No Users Found';
      }
    })
  }
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

// will create an item list of played items given the list of possible items and their 'plays' value
function newPlayedList(listOf){
  var played = [];
  for (var i in listOf){
    if (listOf[i].plays === true) {
      played.push(listOf[i].name);
    }
  }
  return played
}