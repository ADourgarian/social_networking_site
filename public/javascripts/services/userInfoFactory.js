app.factory('userInfoFactory', function($http, $routeParams, authService, $location) {
  var myService = {};

  myService.directUser = function () {
    if ($routeParams.user) { // if entered param, direct to that profile.
      return $routeParams.user;
    } else if (authService.getUser()) { // if no param, but is logged in, direct to their user
      return authService.getUser().username;
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
      if(followers[i] === authService.getUser().username){
        return 'UnSubscribe';
      }
    }
    return 'Subscribe';
  };

  // on subscribe, add usernames to eachothers followers/following arrays. Send back new userInfo with updated array.
  myService.subscribe = function(userPage, currentUserInfo){
    currentUserInfo.editable.following.push(userPage.username);
    $http.put('/users/'+ authService.getUser().username, currentUserInfo).then(function(response){currentUserInfo = response.data});

    userPage.editable.followers.push(authService.getUser().username);

    return {userInfo:userPage, currentUserInfo:currentUserInfo}
  };


  // on unSubscribe, remove usernames from eachothers followers/following arrays. Send back new userInfos with updated array.
  myService.unSubscribe = function(userPage, currentUserInfo){
    currentUserInfo.editable.following.splice(currentUserInfo.editable.followers.indexOf(userPage.username),1);
    $http.put('/users/'+ authService.getUser().username, currentUserInfo).then(function(response){currentUserInfo = response.data});

    userPage.editable.followers.splice(userPage.editable.followers.indexOf(authService.getUser().username),1);

    return {userInfo:userPage, currentUserInfo:currentUserInfo}
  };

  myService.getBlog = function(url){
    return $http({
      url: '/blog/' + url,
      method: 'get'
    }).then(function (response) {
      return response.data
    });
  };

  myService.post = function (newPost, postList, currentUserInfo) {
    console.log('newPost: ',newPost);
    var currentPost = {
      text: newPost,
      post_id: postList.length,
      newComment: '',
      comments: [],
      date: new Date(),
      poster: currentUserInfo.firstName + ' ' + currentUserInfo.lastName,
      username: currentUserInfo.username
    };
    postList.push(currentPost);
    return postList
  };

  //myService.postComment = function (post, postList, currentUserInfo) {
  //  console.log('MY POST', post);
  //  var currentComment = {
  //    text: post.newComment,
  //    comment_id: post.comments.length,
  //    date: new Date(),
  //    poster: currentUserInfo.firstName + ' ' + currentUserInfo.lastName,
  //    username: post.username,
  //    postOwner:post.username,
  //    post_id: post.post_id
  //  };
  //
  //  post.comments.push(currentComment);
  //  post.newComment = '';
  //  $http({
  //    url: '/blog/comment',
  //    method: 'put',
  //    data: currentComment
  //  }).then(function(response){
  //    console.log(response);
  //  });
  //  return postList;
  //};


  myService.postComment = function (post_id, postOwner, postList, currentUserInfo) {
    for (var i in postList) {
      if (postList[i].post_id === post_id) {
        var currentComment = {
          text: postList[i].newComment,
          comment_id: postList[i].comments.length,
          date: new Date(),
          poster: currentUserInfo.firstName + ' ' + currentUserInfo.lastName,
          username: currentUserInfo.username,
          postOwner: postOwner,
          post_id: post_id
        };
        postList[i].comments.push(currentComment);
        postList[i].newComment = '';
        console.log('CURRENT COMMENT:', currentComment);
        $http({
          url: '/blog/comment',
          method: 'post',
          data: currentComment
        }).then(function(response){
          console.log(response.data);
        })
      }
    }
    return postList;
  };

  myService.updateBlog = function(url, postList) {
    $http({
      url: '/blog/post/' + url,
      method: 'post',
      data: postList
    }).then(function () {
    })
  };
  return myService;
});