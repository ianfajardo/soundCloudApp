angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope){

})

.controller('ContentCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };  
})

.controller('PlayCtrl', function($scope, $http, $sce){
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  var my_client_id = "4c700ed67691776e2be4b9e0a3d9d8b2";
  $scope.playing = false;
  $scope.play_name = "Play";
  var image_uri = "";

  $http.get('http://api.soundcloud.com/tracks/190701243.json?client_id=' + my_client_id).
  success(function(track) {
    var song_image = track.artwork_url;
    if(song_image == null){
      song_image = track.user.avatar_url;
    }
    $scope.sc_image = (song_image + '?client_id=' + my_client_id).replace("large", "t500x500");
    $scope.sc_uri = track.stream_url + '?client_id=' + my_client_id;
    $scope.artist = track.user.username;
  });

  $scope.play = function(){
      if(!$scope.playing){
        document.getElementById('audio').play();
        $scope.play_name = "Pause";
        $scope.playing = true;
              }
      else{
        $scope.playing = false;
        $scope.play_name = "Play";
        document.getElementById('audio').pause();
      }
  };

  $scope.replay = function(){
    document.getElementById('audio').currentTime = 0;
    document.getElementById('audio').play();
    $scope.play_name = "Pause";
    $scope.playing = true;
  };
})