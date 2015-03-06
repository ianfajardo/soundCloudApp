// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('PlayCtrl', function($scope, $http, $sce){
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  var my_client_id = "4c700ed67691776e2be4b9e0a3d9d8b2";
  $scope.playing = false;
  $scope.play_name = "Play";
  var image_uri = "";

  $http.get('http://api.soundcloud.com/tracks/186823484.json?client_id=' + my_client_id).
  success(function(track) {
    $scope.sc_image = (track.artwork_url + '?client_id=' + my_client_id).replace("large", "t500x500");
    $scope.sc_uri = track.stream_url + '?client_id=' + my_client_id;
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