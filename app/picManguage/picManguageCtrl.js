/**
 * Created by Administrator on 2018/1/16.
 */
"use strict";

let picManguageController = angular.module('picManguageCtrl', [])

picManguageController.controller('picManguageCtrl', ['$scope',
    '$http',
    '$httpParamSerializer',
    function ($scope,
              $http,
              $httpParamSerializer) {

        /*
        * 瀑布流*/
        window.onload = function () {
            waterFlow('album-container','pic-item')
        }

        var minHeight = 0;

        function waterFlow(parent,child){
            var parentBox = document.getElementById(parent);
            var childs = parentBox.getElementsByClassName(child);
            var windowW = document.body.clientWidth;
            var childW = childs[0].offsetWidth
            var cols = Math.floor(windowW / childW)
            var parentBoxW =  childW * cols;
            parentBox.style.cssText = "width: " + parentBoxW + "px; margin:0 auto";
            getMinHeight(childs, cols);
        }

        function getMinHeight(childs, cols){
            var arr = []
            for(var i = 0; i < childs.length; i++){
                if(i < cols){
                    arr.push(childs[i].offsetHeight)
                }else {
                    minHeight = Math.min.apply(null, arr)
                    var index = getminIndex(minHeight, arr)
                    childs[i].style.position = 'absolute';
                    childs[i].style.top = arr[index] - 10 + 'px';
                    childs[i].style.left = childs[index].offsetLeft + 'px';
                    arr[index] += childs[i].offsetHeight
                }
            }
        }

        function getminIndex(minHeight, arr){
            for(var i = 0;i < arr.length; i++){
                if(arr[i] == minHeight){
                    return i
                }
            }
        }

        /*
        * 全选*/
        $scope.picList = [
            {
                id: 1,
                pic_name: 'jay',
                imgUrl: 'http://i4.bvimg.com/626366/f5df9e253b56dfb2.jpg'
            },
            {
                id: 2,
                pic_name: 'table',
                imgUrl: 'http://i4.bvimg.com/626366/c1f09be688d6398a.jpg'
            },
            {
                id: 3,
                pic_name: 'school',
                imgUrl: 'http://i4.bvimg.com/626366/91eb2c3d7ec84569.jpg'
            },
            {
                id: 4,
                pic_name: 'jay',
                imgUrl: 'http://i4.bvimg.com/626366/f5df9e253b56dfb2.jpg'
            },
            {
                id: 5,
                pic_name: 'table',
                imgUrl: 'http://i4.bvimg.com/626366/c1f09be688d6398a.jpg'
            },
            {
                id: 6,
                pic_name: 'school',
                imgUrl: 'http://i4.bvimg.com/626366/91eb2c3d7ec84569.jpg'
            },
            {
                id: 7,
                pic_name: 'jay',
                imgUrl: 'http://i4.bvimg.com/626366/f5df9e253b56dfb2.jpg'
            },
            {
                id: 8,
                pic_name: 'table',
                imgUrl: 'http://i4.bvimg.com/626366/c1f09be688d6398a.jpg'
            },
            {
                id: 9,
                pic_name: 'school',
                imgUrl: 'http://i4.bvimg.com/626366/91eb2c3d7ec84569.jpg'
            },
            {
                id: 10,
                pic_name: 'jay',
                imgUrl: 'http://i4.bvimg.com/626366/f5df9e253b56dfb2.jpg'
            },
            {
                id: 11,
                pic_name: 'table',
                imgUrl: 'http://i4.bvimg.com/626366/c1f09be688d6398a.jpg'
            },
            {
                id: 12,
                pic_name: 'school',
                imgUrl: 'http://i4.bvimg.com/626366/91eb2c3d7ec84569.jpg'
            },
        ]
        var select_all_flag = 0;
        $scope.checked = [];
        $scope.chooseAll = () => {
            if(select_all_flag == 0) {
                $scope.checked = [];
                select_all_flag = 1;
                angular.forEach($scope.picList, (item) => {
                    item.checked = true;
                    $scope.checked.push(item.id)
                })
            } else {
                $scope.checked = [];
                select_all_flag = 0;
                angular.forEach($scope.picList, (item) => {
                    item.checked = false;
                })
            }
        }

        $scope.selectOne = function () {
            angular.forEach($scope.picList, (item) => {
                let index = $scope.checked.indexOf(item.id);
                if(item.checked && index === -1) {
                    $scope.checked.push(item.id);
                } else if (!item.checked && index !== -1){
                    $scope.checked.splice(index, 1);
                };
            })

            if ($scope.picList.length === $scope.checked.length) {
                select_all_flag = 1;
            } else {
                select_all_flag = 0;
            }
        }

        /*
        * 反选*/
        $scope.chooseInverse = () => {
            angular.forEach($scope.picList, (item) => {
                if (item.checked) {
                    item.checked = false
                } else {
                    item.checked = true
                }
            })
        }

        /*
        * 删除*/
        $scope.deletePic = () => {
            let deletePic_id = '';
            console.log(deletePic_id.split(','))
            angular.forEach($scope.picList, (item) => {
                if (item.checked) {
                    if (deletePic_id !== '') {
                        deletePic_id += ',' + item.id
                    } else {
                        deletePic_id += item.id
                    }
                }
            })

            let deleteData = $httpParamSerializer({
                id: deletePic_id
            })
            let deleteUrl = ''
            $http({
                method: "POST",
                data: deleteData,
                url: deleteUrl,
                headers: {
                    "Content-Type": "x-www-form-urlencoded"
                }
            })
            .then( (resp) => {
                console.log(resp)
            }, (error) => {
                console.log(error)
            })
        }

        /*
        * 修改图片信息*/
        $scope.modify_pic_info = (item) => {
            let modifyData = $httpParamSerializer(item)
            let modifyUrl = ''
            $http({
                method: "POST",
                data: modifyData,
                url: modifyUrl,
                headers: {
                    "Content-Type": "x-www-form-urlencoded"
                }
            })
                .then( (resp) => {
                    console.log(resp)
                }, (error) => {
                    console.log(error)
                })
        }

        /*
        * 显示原图*/
        $scope.show_popup = false
        $scope.showOriPic = (url) => {
            console.log('..')
            $scope.show_popup = true
            $scope.ori_url = url;
        }

        /*
        * 关闭弹框*/
        $scope.closePopup = () => {
            $scope.show_popup = false
        }
    }
])

module.exports = picManguageController