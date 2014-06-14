(function(ng, $, undef){
  var
  log = function(){
    console.log.apply(console, arguments);
  },
  shortkey = function($event){
    log($event);
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