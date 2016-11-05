var ROOT_URL = "localhost:8080";
var SETTINGS = new SettingsManager();

$(function(){
    'use strict';    
    var automan = angular.module("automan", []);

    automan.controller('mainController', ['$scope', '$interval', function($scope, $interval) {  

        var initializeGameLoop = function(engine, SETTINGS){
            var frameLoop = engine.gameLoop.bind(engine);  
            $interval(frameLoop, 1000/SETTINGS.get("MAX_FPS"));
        }   

        var initialize = function(){
            var $canvas = angular.element("#game-canvas");
            var engine = new Engine($canvas);
                  
            initializeGameLoop(engine, SETTINGS)

            $scope.settings = SETTINGS;
            $scope.fpsTracker = new FPSTracker(engine.game_data);
        }        

        $scope.updateSetting = function(key, value){
            SETTINGS.update(key, value);
        }

        initialize();

    }]);

});
