'use strict';

angular.module('integrationApp')
  .controller('DemoCtrl', function ($scope, famous) {
    var GenericSync = famous['famous/input/genericsync'];
    var Transitionable = famous['famous/transitions/transitionable']
    var EventHandler = famous['famous/core/eventhandler']

    var colors = [
      '#869B40',
      '#C2B02E',
      '#629286',
      '#B58963',
      '#9E9B8C'
    ];
    $scope.test = "mrow"

    $scope.$watch('test', function(a){console.log(a)});

    var strings = [
      'famo.us',
      'angular',
      'javascript',
      'san francisco',
      'web'
    ];

    var elements = 1000;

    $scope.surfs = _.map(_.range(elements), function(i){
      return {
        content: _.sample(strings),
        bgColor: _.sample(colors),
      }
    });

    // setInterval(function(){
    //   for(var i = 0; i < elements; i++){
    //     $scope.surfs[i].content = _.sample(strings);
    //     $scope.surfs[i].bgColor = _.sample(colors);
    //   }
    //   if(!$scope.$$phase)
    //     $scope.$apply();
    // }, 333);


    $scope.yTransitionable = new Transitionable(0);
    //TODO:  make syncs declarative
    var sync = new GenericSync(function() {
      return $scope.yTransitionable.get(0);
    }, {direction: GenericSync.DIRECTION_Y});

    sync.on('update', function(data) {
      $scope.yTransitionable.set(data.p);
    });

    //TODO:  make event handlers declarative
    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe(sync);

    $scope.getY = function(index){
      return index * (20 + $scope.yTransitionable.get());
    }
  });
