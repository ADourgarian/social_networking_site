app.controller('blogCtrl',['$scope', 'userInfoFactory', 'authService',
  function($scope, userInfoFactory, authService) {


    var nextPostId = 0;
    $scope.url = userInfoFactory.directUser();
    $scope.postList = [];

    userInfoFactory.getBlog($scope.url).then(function(data){
      $scope.postList = data.posts;
    });

    userInfoFactory.getUserInfo(authService.getUser().username).then(function(data){
      $scope.currentUserInfo = data;
    });

// every post gets its own object with its own comments array, tracked by IDs, and get added to postList array.


    $scope.post = function(){
      $scope.postList = userInfoFactory.post($scope.newPost, $scope.postList, $scope.currentUserInfo);
      userInfoFactory.updateBlog($scope.url, $scope.postList);
    };

// every comment added to current post's comments field, each comment has object with ID for tracking
    $scope.postComment = function(post_id){
      $scope.postList = userInfoFactory.postComment(post_id, $scope.postList, $scope.currentUserInfo);
      userInfoFactory.updateBlog($scope.url, $scope.postList);
    }

  }]);