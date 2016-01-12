app.factory('userInfoFactory', function($http, $routeParams, authService, $location) {
  var myService = {};
  var currentUser = authService.getUser().username; //set var for logged ßin user

  myService.directUser = function () {
    if ($routeParams.user) { // if entered param, direct to that profile.
      return $routeParams.user;
    } else if (authService.getUser()) { // if no param, but is logged in, direct to their user
      return currentUser;
    } else {
      $location.path('/')
    }
  }; // if neither, send to home

  // determine where to send user.
  myService.getUserInfo = function(currentUrl) {
    return $http({
      url: '/users/' + currentUrl,
      method: 'get'
    }).then(function (response) {
      if (response.data) {
        return response.data
      } else {
        $location.path('/');
      }
    });
  };

  myService.submission = function(username, userInfo){
    $http.put('/users/' + username, userInfo).then(function(response){
    });
  };

  myService.checkSubscription = function(followers){
    for (var i in followers) {
      if(followers[i] === currentUser){
        return 'UnSubscribe';
      }
    }
    return 'Subscribe';
  };

  // on subscribe, add usernames to eachothers followers/following arrays. Send back new userInfo with updated array.
  myService.subscribe = function(userPage, currentUserInfo){
    currentUserInfo.editable.following.push(userPage.username);
    $http.put('/users/'+ currentUser, currentUserInfo).then(function(response){currentUserInfo = response.data});

    userPage.editable.followers.push(currentUser);

    return {userInfo:userPage, currentUserInfo:currentUserInfo}
  };


  // on unSubscribe, remove usernames from eachothers followers/following arrays. Send back new userInfos with updated array.
  myService.unSubscribe = function(userPage, currentUserInfo){
    currentUserInfo.editable.following.splice(currentUserInfo.editable.followers.indexOf(userPage.username),1);
    $http.put('/users/'+ currentUser, currentUserInfo).then(function(response){currentUserInfo = response.data});

    userPage.editable.followers.splice(userPage.editable.followers.indexOf(currentUser),1);

    return {userInfo:userPage, currentUserInfo:currentUserInfo}
  };

  myService.getBlog = function(postList, url){
    return $http({
      url: '/blog/' + url,
      method: 'get'
    }).then(function (response) {
      return response.data
    });
  };

  myService.post = function (newPost, postList) {
    var currentPost = {
      text: newPost,
      post_id: postList.length,
      newComment: '',
      comments: [],
      date: new Date()
    };
    postList.push(currentPost);
    return postList
  };

  myService.postComment = function (post_id, postList) {
    for (var i in postList) {
      if (postList[i].post_id === post_id) {
        var currentComment = {
          text: postList[i].newComment,
          comment_id: postList[i].comments.length,
          date: new Date()
        };
        postList[i].comments.push(currentComment);
        postList[i].newComment = '';
      }
    }
    return postList;
  };

  myService.updateBlog = function(url, postList) {
    $http({
      url: '/blog/' + url,
      method: 'post',
      data: postList
    }).then(function () {
    })
  };
  return myService;
});