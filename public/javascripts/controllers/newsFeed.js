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
      });
    }
  });

}]);