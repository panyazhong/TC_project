/**
 * Created by Administrator on 2018/1/3.
 */
'use strict';

var uploadLocalImageController = angular.module('uploadLocalImageCtrl', [])

uploadLocalImageController.controller('uploadLocalImageCtrl',
    ['$scope',
        'Upload',
        '$http',
    function ($scope,
              Upload,
              $http) {
        $scope.data = {
            file: null,
            defaultImage: 'blob:http://localhost:8080/e1099f92-6f4d-4a23-8083-3b2877514c7a'
        };

        $scope.mulImages = [];

        //$scope.$watch('files', function () {
        //    $scope.selectImage($scope.files);
        //});
        //根据选择的图片来判断 是否为一下子选择了多张
        //一下子选择多张的数据格式为一个数组中有多个对象，而一次只选择一张的数据格式为一个数组中有一个对象
        $scope.total = 0;
        $scope.size = 0;
        $scope.hasImg = false;
        var newFileArr = [];
        $scope.selectImage = function (files) {
            for(var i = 0;i < files.length;i++) {
                if (newFileArr.indexOf(files[i].name) == -1) {
                    newFileArr.push(files[i].name)
                    if (!files || !files.length) {
                        $scope.hasImg = false;
                        return;
                    } else {
                        $scope.hasImg = true;
                    }
                    if (files.length > 1) {
                        var image = [];
                        image.push(files[i]);
                        $scope.size += Math.floor(files[i].size / 1024);
                        $scope.mulImages.push(image);
                    } else {
                        $scope.size += Math.floor(files[0].size / 1024);
                        $scope.mulImages.push(files);
                    }
                } else {
                    alert("图片重复！");
                    break
                }
            }
            $scope.total = $scope.mulImages.length;
        };

        $scope.upload = function () {
            if (!$scope.mulImages.length) {
                return;
            }
            var uploadUrl = 'http://mc.urzz.me:8080/picture/upload/';

            var fd = new FormData();
            angular.forEach($scope.mulImages, (item) => {
                fd.append('file',item[0])
            })
            $http({
                method: 'POST',
                url: uploadUrl,
                data: fd,
                headers: {
                    'Content-Type': undefined
                },
                withCredentials: true,
                transformRequest: angular.identity,
            })
            .then( (resp) => {
                console.log(resp)
                if(resp.data.status){
                    $scope.hasImg = false;
                    alert(resp.data.message);
                    $scope.mulImages = []
                }
            }, (error) => {
                console.log(error)
            })
            //Upload.upload({
            //    //服务端接收
            //    url: uploadUrl,
            //    method: 'POST',
            //    withCredentials: true,
            //    //上传的同时带的参数
            //    //data: {'username': $scope.username},
            //    //上传的文件
            //    file: fd
            //}).progress(function (evt) {
            //    //进度条
            //    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //    console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
            //}).success(function (data, status, headers, config) {
            //    //上传成功
            //    console.log(data)
            //    $scope.uploadImg = data;
            //}).error(function (data, status, headers, config) {
            //    //上传失败
            //    console.log('error status: ' + status);
            //});
        };

        /*
        * 删除图片*/
        $scope.delete = (a) => {
            $scope.mulImages.splice(a.$index, 1);
        }

    }
])

module.exports = uploadLocalImageController;
