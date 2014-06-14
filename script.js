(function(ng, $, undef){
  var

  config = {
    duration: 90, // zaman bazi be saniye
    fps: 2 // frame per seconds: tedade update dar saniye
  },

  vars = {
    tongs: [
      {val: 100},
      {val: 100}
    ],
    step: 100 / (config.duration*config.fps),
    tongsHeight: 320,
    playerWin: 0 // 1(left) or 2(right) or 3(equal)
  },

  $scope,

  timerId = 0,

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

  updateGame = function(){
    var over, val, n;
    for(n=0; n<2; n++){
      val = getTongs(n);
      val -= vars.step;
      if(val > 0){
        setTongs(n, val);
      }else{
        over = true;
      }
    }

    over && gameOver();
    
    apply();
  },

  gameOver = function(){
    var vals = [getTongs(0), getTongs(1)];
    if(vals[0] > vals[1]){
      playerWin(0);
    }else if(vals[1] > vals[0]){
      playerWin(1);
    }else{
      playerWin(2);
    }
  },

  startGame = function(){
    log('Start game.');
    if(timerId){
      log('Game is runing!');
    }else{
      timerId = setInterval(updateGame, 1000/config.fps);
    }
  },

  resetGame = function(){
    log('Reset game.');
    setTongs(0, 100);
    setTongs(1, 100);
    stopTimer();
    config.playerWin = 0;
  },

  playerWin = function(n){
    log('Player %s win.', n+1);
    vars.playerWin = n+1;
    stopTimer();
  },

  stopTimer = function(){
    if(timerId){
      timerId = clearInterval(timerId);
    }else{
      log('Game not runing!')
    }
  },

  setTongs = function(n, newVal){
    //log('Change Tong %s: %s to %s', n, vars.tongs[n].val, newVal)
    vars.tongs[n].val = newVal;
  },

  getTongs = function(n){
    //log('getTongs %s: %s', n, vars.tongs[n].val);
    return vars.tongs[n].val;
  },

  getToneHeight = function (n) {
    var retval = getTongs(n-1) * vars.tongsHeight / 100;
    //log('getToneHeight %s: %s', n, retval);
    return Math.round(retval) + 'px'
  },

  apply = function () {
    $scope.$apply();
  }

  mainCtrl = function($skope){
    $scope = $skope;
    $scope.shortkey = shortkey;
    $scope.getToneHeight = getToneHeight;
  },

  init = function(){
    ng
      .module('taGame', [])
      .controller('mainCtrl', ['$scope', mainCtrl]);
  }
  ;
  return {init: init};
})(angular, angular.element).init();
