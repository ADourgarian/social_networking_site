app.controller('blogCtrl',['$scope', 'userInfoFactory',
  function($scope, userInfoFactory) {


    var nextPostId = 0;
    $scope.url = userInfoFactory.directUser();
    $scope.newPost = '';
    $scope.newComment = '';
    $scope.postList = [];

    userInfoFactory.getBlog($scope.postList, $scope.url).then(function(data){
      $scope.postList = data.posts;
    });


// every post gets its own object with its own comments array, tracked by IDs, and get added to postList array.


    $scope.post = function(){
      $scope.postList = userInfoFactory.post($scope.newPost, $scope.postList);
      userInfoFactory.updateBlog($scope.url, $scope.postList);
    };

// every comment added to current post's comments field, each comment has object with ID for tracking
    $scope.postComment = function(post_id){
      $scope.postList = userInfoFactory.postComment(post_id, $scope.postList);
      userInfoFactory.updateBlog($scope.url, $scope.postList);
    }

  }]);