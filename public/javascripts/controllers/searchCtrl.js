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
     $location.path('/bridge/'+username);
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
  };
}]);