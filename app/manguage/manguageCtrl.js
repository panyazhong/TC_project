/**
 * Created by Administrator on 2018/1/16.
 */
"use strict";

let manguageController = angular.module('manguageCtrlModule',[]);

manguageController.controller('manguageCtrl', ['$scope',
    '$http',
    '$httpParamSerializer',
    function ($scope,
              $http,
              $httpParamSerializer) {
        /*
        * 删除对应的相册*/
        $scope.delete = (id) => {
            let data = $httpParamSerializer({
                id: id
            })
            let deleteUrl = ''
            $http({
                method: "POST",
                data: data,
                url: deleteUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then( (resp) => {
                console.log(resp)
            }, (error) => {
                console.log(error)
            })
        }
    }
])

module.exports = manguageController;