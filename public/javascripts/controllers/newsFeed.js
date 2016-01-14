app.controller('newsFeed',['$scope', 'authService', 'userInfoFactory',function($scope, authService, userInfoFactory){
  $scope.postList = [];

  $scope.currentUser = authService.getUser().username;
  userInfoFactory.getUserInfo($scope.currentUser).then(function(data) {
    $scope.userInfo = data;
    $scope.following = $scope.userInfo.editable.following;

    for (var i in $scope.following){
      userInfoFactory.getBlog($scope.following[i]).then(function(data){
        var oneList = data.posts;
        for (var x in oneList){
          $scope.postList.push(oneList[x]);
        }
        console.log(oneList);
      });
    }
  });

  // every post gets its own object with its own comments array, tracked by IDs, and get added to postList array.


  $scope.post = function(){
    $scope.postList = userInfoFactory.post($scope.newPost, $scope.postList, $scope.userInfo);
    userInfoFactory.updateBlog($scope.currentUser, $scope.postList);
  };

// every comment added to current post's comments field, each comment has object with ID for tracking
  $scope.postComment = function(post_id, postOwner){
    console.log('post_id',post_id, 'post_Owner', postOwner);
    $scope.postList = userInfoFactory.postComment(post_id, postOwner, $scope.postList, $scope.userInfo);
    //userInfoFactory.updateBlog($scope.url, $scope.postList);
  }
}]);