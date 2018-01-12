/**
 * Created by sunqun on 2018/1/2.
 */

var ctr = [
    require('./entrance/entranceCtrl').name
];

var loanController = angular.module('loan', ctr);
module.exports = loanController;