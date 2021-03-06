/**
 * Created by Administrator on 2018/1/5.
 */
"use strict";

var centerController = angular.module('centerCtrlModule',['ngFileUpload'])

centerController.controller('centerCtrl',['$scope',
    'Upload',
    '$http',
    function($scope,
             Upload,
             $http){
        /*
        * 选项卡*/
        let oLis = document.getElementsByClassName('click-li');
        let info_cons = document.getElementsByClassName('info-content');
        for(let i = 0; i < oLis.length; i++){
            oLis[i].onclick = () => {
                for(let j = 0; j < oLis.length; j++){
                    info_cons[j].style.display = 'none';
                    oLis[j].className = 'click-li';
                }
                info_cons[i].style.display = 'block';
                oLis[i].className = 'click-li active';
            }
        }

        /**/
        $scope.user = {
            username: 'dapan',
            reg_time: '2018-01-08',
            pet_name: '匿名此',
            birthday: new Date('2017-01-20')
        }

        /*
        * 获取用户基本信息*/
        let getBaseinfo = () => {
            let baseInfoUrl = '';
            $http({
                method: 'POST',
                data: '',
                url: baseInfoUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
                .then( (resp) => {

                }, (error) => {

                })
        }
        //getBaseinfo()

        /*
        * 修改用户基本信息*/
        $scope.submitBaseInfo = (user) => {
            console.log(user)
            let submitBaseInfoUrl = '';
            $http({
                method: 'POST',
                data: '',
                url: submitBaseInfoUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
                .then( (resp) => {

                }, (error) => {

                })
        }

        /*
        * 修改密码*/
        $scope.submitpwd = (user) => {

        }
    }

])

module.exports = centerController