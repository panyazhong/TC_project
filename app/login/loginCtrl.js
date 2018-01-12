/**
 * Created by sunqun on 2018/1/2.
 */
'use strict';

var loginController = angular.module('loginCtrlModule', []);

loginController.controller('loginCtrl', ['$scope','$location','$httpParamSerializer','$http','$rootScope',
    function ($scope,$location,$httpParamSerializer,$http,$rootScope) {
        $scope.username = 'dapan';
        /*
        * 登录*/
        $scope.login = (user) => {
            if(checkIsNull()){
                login(user)
            }
        }

        /*
        * 检查用户名密码是否填写*/
        let checkIsNull = () => {
            if($scope.user){
                $scope.mailIsNull = !!$scope.user.username ? false : true;
                $scope.pwdIsNull = !!$scope.user.password ? false : true;
            }else{
                $scope.mailIsNull = true;
                $scope.pwdIsNull = true;
            }
            return !($scope.mailIsNull || $scope.pwdIsNull);
        }

        /*
        * 登录*/
        let login = (user) => {
            let loginUrl = 'http://mc.urzz.me:8080/user/login';
            let loginData = $httpParamSerializer(user);
            $http({
                method: "POST",
                data: loginData,
                url: loginUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
                .then((resp) => {
                    console.log(resp);
                    if (resp.data.status){
                        alert(resp.data.message)
                        $rootScope.showLogin = true
                        $rootScope.username = user.username
                    }
                },(xhr,error) => {
                    console.log(error)
                })
            //$location.path('center')
        }

        /*
        * remPwd*/
        $scope.remPwd = () => {
            if (!$scope.isRem) {
                delCookie('username');
                delCookie('password');
            }
        }

        /*
        * delCookie*/
        let delCookie = (name) => {
            setCookie(name, null, -1);
        }

        /*
        * setCookie*/
        let setCookie = (name, value, day) => {
            let date = new Date()
            date.setDate(date.getDate() + day)
            document.cookie = name + '=' + value + ';expires=' + date
        }

        /*
        * getCookie*/
        let getCookie = (name) => {
            var reg = RegExp(name+'=([^;]+)');
            var arr = document.cookie.match(reg);
            if(arr){
                return arr[1];
            }else{
                return '';
            }
        }
}]);

module.exports = loginController;