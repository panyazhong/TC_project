/**
 * Created by Administrator on 2018/1/17.
 */
"use strict";

let mainController = angular.module('mainCtrlModule', []);

mainController.controller('mainCtrl',['$scope',
    function($scope){
        /*
        * 文字滚动*/
        var timer = setInterval( () => {
            if(!!document.getElementById('scrollText')){
                var scrolltext = document.getElementById('scrollText').innerText
                var newText = scrolltext.slice(1,scrolltext.length);
                var scrollArr = newText.split('')
                var deleteEl = scrolltext.split('').splice(0,1)
                scrollArr.push(deleteEl[0])
                newText = scrollArr.join('')
                document.getElementById('scrollText').innerText = newText
            }
        }, 500)
    }
])

module.exports = mainController