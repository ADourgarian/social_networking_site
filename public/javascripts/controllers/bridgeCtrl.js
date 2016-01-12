app.controller('bridgeCtrl',['$scope',  '$http', '$routeParams', 'authService','userInfoFactory', '$location', 'Upload',
  function($scope, $http, $routeParams, authService, userInfoFactory, $location, Upload){

    $scope.currentUser = authService.getUser().username; //set var for logged ßin user
    $scope.subscribeButton = 'Subscribe';
    var userInfos = {};




    //// determine where to send user.
    //if ($routeParams.user){ // if entered param, direct to that profile.
    //  $scope.url = $routeParams.user;
    //} else if (authService.getUser()){ // if no param, but is logged in, direct to their user
    //  $scope.url = $scope.currentUser;
    //} else {
    //  $location.path('/')
    //} // if neither, send to home

    $scope.url = userInfoFactory.directUser();

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
    function populateCurrentUserInfo(){
      userInfoFactory.getUserInfo($scope.currentUser).then(function(data){
        $scope.currentUserInfo = data;
      })
    }
    function populateUserInfo() {
      userInfoFactory.getUserInfo($scope.url).then(function(data){
        $scope.userInfo = data;
        $scope.username = $scope.userInfo.username;
        $scope.editable = $scope.userInfo.editable;
        $scope.fullName = $scope.userInfo.firstName + ' ' + $scope.userInfo.lastName;
        $scope.profilePic = $scope.userInfo.profilePic;

        refresh();
      });
    }

    function refresh(){
      populateCurrentUserInfo();

      populateUserInfo();

      // pre-fill form.
      fillCheckboxes($scope.editable.instrumentsPlayed, $scope.instruments);
      fillCheckboxes($scope.editable.genresPlayed, $scope.genres);

      $scope.subscribeButton = userInfoFactory.checkSubscription($scope.editable.followers);
    }
    populateCurrentUserInfo();
    populateUserInfo();


    // form settings
    $scope.openForm = false;
    $scope.changeProfilePic = false;
    $scope.editForm = function(){
      if ($scope.openForm === false) {
        $scope.openForm = true;
      } else {
        populateUserInfo();
        $scope.openForm = false;
      }
    };

    // form settings for Profile Pic
    $scope.profilePicButton = 'Change Profile Pic';
    $scope.editPic = function(){
      if ($scope.changeProfilePic === false){
        $scope.changeProfilePic = true;
        $scope.profilePicButton = 'Done Editing'
      } else {
        populateUserInfo();
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
    function fillCheckboxes(played,listOf){
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

    //$scope.file_changed = function(element) {
    //
    //  $scope.$apply(function(scope) {
    //    var photofile = element.files[0];
    //    var reader = new FileReader();
    //    reader.onload = function(e) {
    //      // handle onload
    //    };
    //    reader.readAsDataURL(photofile);
    //  });
    //};

    //$('.profilePicForm').on('submit',function(event){
    //  event.preventDefault();
    //  alert('hello');
    //  console.log($(this).serializeArray());
    //});


    // upload later on form submit or something similar
    $scope.submitProfilePic = function(){
      Upload.upload({
        url: '/pictures/profile/'+ $scope.username,
        method: 'post',
        data: $scope.upload,
        dataType: 'formData'
      }).then(function (response) {
        // $scope.uploads.push(response.data);
        $scope.upload = {};
      })
    };

    $scope.submit = function () {

      $scope.editable.instrumentsPlayed = []; // reset instrumentsPlayed list
      $scope.editable.genresPlayed = []; // reset genresPlayed list

      $scope.editable.instrumentsPlayed = newPlayedList($scope.instruments); // recreate instrumentsPlayed
      $scope.editable.genresPlayed = newPlayedList($scope.genres); // recreate genresPlayed

      userInfoFactory.submission($scope.username, $scope.userInfo)
    };


    // -------------- SUBSCRIPTION -------------- //


    $scope.subscribeToggle = function(){
      if ($scope.subscribeButton === 'UnSubscribe'){
        userInfos = userInfoFactory.unSubscribe($scope.userInfo, $scope.currentUserInfo);
        $scope.userInfo = userInfos.userInfo;
        $scope.currentUserInfo = userInfos.currentUserInfo;

        userInfoFactory.submission($scope.username, $scope.userInfo);
        refresh()
      } else {
        userInfos = userInfoFactory.subscribe($scope.userInfo, $scope.currentUserInfo);
        $scope.userInfo = userInfos.userInfo;
        $scope.currentUserInfo = userInfos.currentUserInfo;

        userInfoFactory.submission($scope.username, $scope.userInfo);
        refresh()
      }
    }


  }]);