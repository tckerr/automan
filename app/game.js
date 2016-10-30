var ROOT_URL = "localhost:8080";
var SETTINGS = new SettingsManager();

$(function(){
    'use strict';    
    var automan = angular.module("automan", []);

    automan.controller('mainController', ['$scope', '$interval', function($scope, $interval) {  

        var initializeGameLoop = function(gameManager, SETTINGS){
            var frameLoop = gameManager.gameLoop.bind(gameManager);  
            $interval(frameLoop, 1000/SETTINGS.get("MAX_FPS"));
        }   

        var initialize = function(){
            var $canvas = angular.element("#game-canvas");
            var gameManager = new GameManager($canvas);
                  
            initializeGameLoop(gameManager, SETTINGS)

            $scope.settings = SETTINGS;
            $scope.fpsTracker = new FPSTracker(gameManager.game_data);
        }        

        $scope.updateSetting = function(key, value){
            SETTINGS.update(key, value);
        }

        initialize();

    }]);

});
