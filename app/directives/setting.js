$(function(){
    'use strict';    
    angular.module("automan").directive("customsetting", function(){
        


        return {
            templateUrl: "/app/directives/setting.html",
            restrict : 'E',
            scope: {
              setting: '=value',
              update: '=update'
            },
        }
    })

});
