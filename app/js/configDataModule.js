/**
 * Created by Administrator on 2018/2/6.
 */
"use strict"

let configDataModule = angular.module('configDataModule',[])

configDataModule.provider('configDataService',function(){
    this.$get = ($http,$location) => {
        return {
            'addClass': (ele, cls) => {
                let clsName = ele.className
                let clsNameArr = clsName.split(' ')
                clsNameArr.push(cls)
                ele.className = clsNameArr.join(' ');
            },
            'delClass': (ele) => {
                let clsName = ele.className
                let clsNameArr = clsName.split(' ')
                clsNameArr.slice(0,clsNameArr.length-1)
                clsName = clsNameArr.slice(0,clsNameArr.length-1)
                ele.className = clsName.join(' ');
            },
            'errorMessage': (data) => {
                if (data.message == '用户未登录') {
                    alert(data.message)
                    $location.path('/login')
                } else {
                    alert(data.message)
                }
            }
        }

    }
})

module.exports = configDataModule;