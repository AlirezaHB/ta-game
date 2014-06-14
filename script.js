(function(ng, $, undef){
  var

  config = function(){
    duration: 90 // zaman bazi be saniye
  },

  log = function(){
    console.log.apply(console, arguments);
  },

  shortkey = function($event){
    switch($event.keyCode){
      case 32:
        startGame();
        break;
      case 82:
        resetGame();
        break;
      case 49:
        playerWin(1);
        break;
      case 50:
        playerWin(2);
        break;
      default:
        log('key "%s" not defined.', $event.keyCode);
    }
  },

  startGame = function(){
    log('Start game.');
  },

  resetGame = function(){
    log('Reset game.');
  },

  playerWin = function(n){
    log('Player %s win.', n);
  },

  mainCtrl = function($scope){
    $scope.shortkey = shortkey;
  },

  init = function(){
    ng
      .module('taGame', [])
      .controller('mainCtrl', ['$scope', mainCtrl]);
  }
  ;
  return {init: init};
})(angular, angular.element).init();