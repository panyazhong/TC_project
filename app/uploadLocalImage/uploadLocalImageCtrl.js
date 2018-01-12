/**
 * Created by Administrator on 2018/1/3.
 */
'use strict';

var uploadLocalImageController = angular.module('uploadLocalImageCtrl', [])

uploadLocalImageController.controller('uploadLocalImageCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'dapan'
    }
])

module.exports = uploadLocalImageController;
