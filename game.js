var SETTINGS = new SettingsManager();

$(function(){
    'use strict';
    
    var automan = angular.module("automan", []);

    automan.controller('mainController', ['$scope', '$interval', function($scope, $interval) {  
        var $canvas = angular.element("#game-canvas");
        var gameManager = new GameManager($canvas);
        var frameLoop = gameManager.gameLoop.bind(gameManager);        

        $interval(frameLoop, 1000/SETTINGS.get("MAX_FPS"));

        $scope.settings = SETTINGS;
        $scope.fpsTracker = new FPSTracker(gameManager.game_data);

        $scope.updateSetting = function(key, value){
            console.log(key, value)
            SETTINGS.update(key, value);
        }

    }]);

});
