app.controller('bridgeCtrl',['$scope', '$http', '$routeParams', 'authService', '$location', 'Upload',
  function($scope, $http, $routeParams, authService, $location, Upload){

    $scope.currentUser = authService.getUser().username; //set var for logged ßin user
    var subscriberNumber = 0;
    var nextPostId = 0;
    $scope.subscribeButton = 'Subscribe';





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
          $scope.username = response.data.username;
          $scope.userInfo = response.data;
          $scope.editable = $scope.userInfo.editable;
          $scope.fullName = $scope.userInfo.firstName + ' ' + $scope.userInfo.lastName;
          $scope.profilePic = $scope.userInfo.profilePic;

          console.log($scope.editable);
          // pre-fill form.
          fillCheckboxes($scope.editable.instrumentsPlayed, $scope.instruments);
          fillCheckboxes($scope.editable.genresPlayed, $scope.genres);
          checkSubscription();
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

    // form settings for Profile Pic
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

      $http.put('/users/' + $scope.username, $scope.userInfo) // send new editable to server
        .then(function (response) {
        });
    };

    // ------------------- BLOG  ------------------- //
    $scope.newPost = '';
    $scope.newComment = '';
    $scope.postList = [];
    function newPostId(){
      nextPostId += 1;
      return nextPostId;
    };

    $http({
      url: '/blog/' + $scope.url,
      method: 'get'
    }).then(function(response){
      $scope.postList = response.data.posts;
    });

    // every post gets its own object with its own comments array, tracked by IDs, and get added to postList array.
    $scope.post = function (){
      var currentPost = {
        text: $scope.newPost,
        post_id: newPostId(),
        newComment: '',
        comments: [],
        date: new Date()
      };
      $scope.postList.push(currentPost);
      updateBlog();
    };


    // every comment added to current post's comments field, each comment has object with ID for tracking
    $scope.postComment = function(post_id){
      for (var i in $scope.postList){
        if ($scope.postList[i].post_id === post_id){
          var currentComment = {
            text: $scope.postList[i].newComment,
            comment_id: $scope.postList[i].comments.length,
            date: new Date()
          };
          $scope.postList[i].comments.push(currentComment);
          $scope.postList[i].newComment = '';
        }
      }
      updateBlog();
    };

    function updateBlog(){
      $http({
        url: '/blog/' + $scope.url,
        method: 'post',
        data: $scope.postList
      }).then(function(){
      })
    };

    // -------------- SUBSCRIPTION -------------- //


    function checkSubscription(){
      for (var i in $scope.editable.followers) {
        if($scope.editable.followers[i] === $scope.currentUser){
          $scope.subscribeButton = 'UnSubscribe';
          subscriberNumber = i;
          return
        }
      }
      $scope.subscribeButton = 'Subscribe';
    };

    $scope.subscribeToggle = function(){
      if ($scope.subscribeButton === 'UnSubscribe'){
        $scope.editable.followers.splice(subscriberNumber,1);
        $scope.submit();
        getUserInfo();
      } else {
        $scope.editable.followers.push($scope.currentUser);
        $scope.submit();
        getUserInfo();
      }
    }


  }]);