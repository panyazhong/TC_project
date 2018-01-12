/**
 * Created by Administrator on 2018/1/4.
 */
'use strict';

let registerController = angular.module('registerCtrlModule', []);

registerController.controller('registerCtrl',['$scope',
    '$location',
    '$httpParamSerializer',
    '$http',
    function($scope, $location, $httpParamSerializer, $http){
        $scope.register = (user) => {
            if(!checkIsNull(user)){
                return
            }else{
                if(validate(user.code,$scope.code)){
                    return
                }else{
                    register(user)
                }
            }

        }

        /*注册*/
        let register = (user) => {
            let regUrl = 'http://mc.urzz.me:8080/user/create';
            user = $httpParamSerializer(user);
            $http({
                method: "POST",
                data: user,
                url: regUrl,
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })
                .then( (resp) => {
                    console.log(resp)
                    if(resp.data.status) {
                        $location.path('/login')
                    }else {
                        alert(resp.data.message)
                    }
                }, (xhr,error) => {
                    console.log(error)
                })
        }

        /*获取验证码*/
        let getCode = () => {
            let codeLength = 4;
            let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                'S','T','U','V','W','X','Y','Z');//随机数
            let code = ''; //验证码
            for(let i = 0;i < codeLength;i++){
                code += '' + random[Math.floor(Math.random()*36)];
            }
            $scope.code = code
        }
        getCode()

        $scope.getCode = getCode;

        /*校验验证码*/
        let validate = (input_code,code) => {
            $scope.codeIsNull = (input_code.toLowerCase() != code.toLowerCase()) ? true : false
            return $scope.codeIsNull
        }

        /*检验必填项是否为空*/
        let checkIsNull = (user) => {
            if(user){
                $scope.mailIsNull = !user.mail ? true : false
                $scope.mailCodeIsNull = !user.mailCode ? true : false
                $scope.petNameIsNull = !user.username ? true : false
                $scope.pwdIsNull = !user.password ? true : false
                $scope.comPwdIsNull = !user.compwd ? true : false
                $scope.codeIsNull = !user.code ? true : false
            }else{
                $scope.mailIsNull = true
                $scope.mailCodeIsNull = true
                $scope.petNameIsNull = true
                $scope.pwdIsNull = true
                $scope.comPwdIsNull = true
                $scope.codeIsNull = true
            }


            return !($scope.mailIsNull ||
                $scope.mailCodeIsNull ||
                $scope.petNameIsNull ||
                $scope.pwdIsNull ||
                $scope.comPwdIsNull ||
                $scope.codeIsNull)
        }
    }
])

module.exports = registerController