/**
 * Created by sunqun on 2018/1/2.
 */
'use strict';

var loginController = angular.module('loginCtrlModule', []);

loginController.controller('loginCtrl', ['$scope','$location','$httpParamSerializer','$http','$rootScope',
    function ($scope,$location,$httpParamSerializer,$http,$rootScope) {

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

        /*
        * 判断用户是否记住密码*/
        if(getCookie('username') && getCookie('password')) {
            $scope.user = {
                username: getCookie('username'),
                password: getCookie('password'),
            }
            $scope.isRem = true
        } else {
            $scope.user = {

            }
            $scope.isRem = false
        }

        /*
        * enter键登录*/
        document.addEventListener('keyup', (e) => {
            e = e || window.event
            if (e.keyCode == 13) {
                login($scope.user)
            }
        })


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
                withCredentials: true,
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
                        $location.path('/main')
                    }
                },(xhr,error) => {
                    console.log(error)
                })
        }

        /*
        * remPwd*/
        $scope.remPwd = (user) => {
            if (!$scope.isRem) {
                delCookie('username');
                delCookie('password');
            } else {
                setCookie('username', user.username, 7);
                setCookie('password', user.password, 7);
            }
        }
}]);

module.exports = loginController;