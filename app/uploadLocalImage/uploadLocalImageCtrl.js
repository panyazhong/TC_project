/**
 * Created by Administrator on 2018/1/3.
 */
'use strict';

var uploadLocalImageController = angular.module('uploadLocalImageCtrl', [])

uploadLocalImageController.controller('uploadLocalImageCtrl',
    ['$scope',
        'Upload',
    function ($scope,
              Upload) {
        $scope.data = {
            file: null,
            defaultImage: 'blob:http://localhost:8080/e1099f92-6f4d-4a23-8083-3b2877514c7a'
        };

        $scope.mulImages = [];

        $scope.$watch('files', function () {
            $scope.selectImage($scope.files);
        });
        //根据选择的图片来判断 是否为一下子选择了多张
        //一下子选择多张的数据格式为一个数组中有多个对象，而一次只选择一张的数据格式为一个数组中有一个对象
        $scope.total = 0;
        $scope.size = 0;
        $scope.hasImg = false;
        $scope.selectImage = function (files) {
            if (!files || !files.length) {
                $scope.hasImg = false;
                return;
            }else{
                $scope.hasImg = true;
            }
            if (files.length > 1) {
                angular.forEach(files, function (item) {
                    var image = [];
                    image.push(item);
                    $scope.size += Math.floor(item.size / 1024);
                    $scope.mulImages.push(image);
                })
            } else {
                $scope.size += Math.floor(files[0].size / 1024);
                $scope.mulImages.push(files);
            }
            $scope.total = $scope.mulImages.length;
        };

        $scope.upload = function () {
            if (!$scope.mulImages.length) {
                return;
            }
            var url = $scope.params.url;
            var data = angular.copy($scope.params.data || {});
            data.file = $scope.mulImages;

            Upload.upload({
                url: url,
                data: data
            }).success(function (data) {
                $scope.hide(data);
                $rootScope.alert('success');
            }).error(function () {
                $rootScope.alert('error');
            });
        };

        /*
        * 删除图片*/
        $scope.delete = (a) => {
            $scope.mulImages.splice(a.$index, 1);
        }
    }
])

module.exports = uploadLocalImageController;
