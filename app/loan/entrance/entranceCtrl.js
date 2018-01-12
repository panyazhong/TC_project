/**
 * Created by sunqun on 2018/1/2.
 */
'use strict';

var entranceController = angular.module('entranceCtrl', []);

entranceController.controller('entranceCtrl', ['$scope', function ($scope) {
    $scope.username = 'sunqun';
}]);

module.exports = entranceController;