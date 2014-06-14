(function(ng, $, undef){
  var

  config = {
    duration: 90 // zaman bazi be saniye
  },

  vars = {
    tongs: [
      {val: 100},
      {val: 100}
    ],
    startTime: null,
    tongsHeight: 400
  }

  log = function(){
    console.log.apply(console, arguments);
  },

  shortkey = function($event){
    switch($event.keyCode){
      case 32: // s
        startGame();
        break;
      case 82: // r
        resetGame();
        break;
      case 49: // 1
      case 97: // num1
        playerWin(0);
        break;
      case 50: // 2
      case 98: // num2
        playerWin(1);
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
    setTongs(0, 100);
    setTongs(1, 100);
  },

  playerWin = function(n){
    log('Player %s win.', n+1);
  },

  setTongs = function(n, newVal){
    log('Change Tong %s: %s to %s', vars.tongs[n].val, newVal)
    vars.tongs[n].val = newVal;
  },

  mainCtrl = function($scope){
    $scope.shortkey = shortkey;
    $scope.vars = vars;
  },

  init = function(){
    ng
      .module('taGame', [])
      .controller('mainCtrl', ['$scope', mainCtrl]);
  }
  ;
  return {init: init};
})(angular, angular.element).init();