/**
 * Created by Administrator on 2018/1/16.
 */
"use strict";

let picManguageController = angular.module('picManguageCtrl', ['configDataModule'])

picManguageController.controller('picManguageCtrl', ['$scope',
    '$http',
    '$httpParamSerializer',
    'configDataService',
    function ($scope,
              $http,
              $httpParamSerializer,
              configDataService) {

        /*
        * 瀑布流*/
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
        * 加载图片*/
        let getPics = () => {
            let getPicUrl = 'http://mc.urzz.me:8080/picture/list'
            $http({
                method: "GET",
                url: getPicUrl,
                withCredentials: true,
                headers: {
                    "Content-Type": "appliction/x-www-form-urlencoded"
                }
            })
            .then((resp) => {
                console.log(resp)
                if (resp.data.status) {
                    for(let i = 0; i < resp.data.data.length; i++){
                        resp.data.data[i].path = "http://" + resp.data.data[i].path
                    }
                    angular.forEach(resp.data.data, (value, key) => {
                        angular.forEach(value.tags, (v, k) => {
                            if (!v.tag_id) {
                                v.tag_name = '默认'
                            }
                        })
                    })
                    $scope.picList = resp.data.data
                    setTimeout(function(){
                        waterFlow('album-container','pic-item')
                    },10)
                } else {
                    configDataService.errorMessage(resp.data)
                }

            }, (error) => {
                console.log(error)
            })
        }
        getPics()
        /*
        * 全选*/
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
            $scope.show_popup = true
            $scope.ori_url = url;
        }

        /*
        * 关闭弹框*/
        $scope.closePopup = (param) => {
            if (param == 0) {
                $scope.show_popup = false
            } else {
                $scope.addTag = false
            }

        }

        //获取图片标签
        let getTags = () => {
            let getTagsUrl = 'http://mc.urzz.me:8080/tag/list'
            $http({
                method: 'GET',
                url: getTagsUrl,
                withCredentials: true,
                headers: {
                    "Content-Type": "appliction/x-www-form-urlencoded"
                }
            })
                .then((resp) => {
                    if (resp.data.status) {
                        $scope.tags = resp.data.data
                    } else {
                        configDataService.errorMessage(resp.data)
                    }
                }, (err) => {
                    console.log(err)
                })
        }

        /*
         * 点击为图标增加标签*/
        $scope.addTag = false
        $scope.addTagPop = (t) => {
            $scope.picture_id = t.item.picture_id
            $scope.addTag = true;
            console.log(t.item.tags)

            $scope.tag = {
                tag_idArr: [],
                tag_nameArr: []
            }
            angular.forEach(t.item.tags, (v, k) => {
                $scope.tag.tag_idArr.push(v.tag_id)
            })
            getTags()
        }

        /*
        * 鼠标滑过高亮*/
        $scope.addCls = (e) => {
            e = window.event
            configDataService.addClass(e.target, 'active')
        }

        $scope.delCls = (e) => {
            e = window.event
            configDataService.delClass(e.target)
        }

        /*
        * 点击选择*/
        $scope.choose = (param) => {
            if(!$scope.tag){
                $scope.tag = {
                    tag_nameArr: [],
                    tag_idArr: []
                }
            }
            if($scope.tag.tag_nameArr.indexOf(param.item.tag_name) > -1) {
                $scope.tag.tag_nameArr.splice($scope.tag.tag_nameArr.indexOf(param.item.tag_name), 1)
                $scope.tag.tag_idArr.splice($scope.tag.tag_idArr.indexOf(param.item.tag_id), 1)
            } else {
                $scope.tag.tag_nameArr.push(param.item.tag_name)
                $scope.tag.tag_idArr.push(param.item.tag_id)
            }
            $scope.tag.tag_name = $scope.tag.tag_nameArr.join(',')
            $scope.tag.tag_id = $scope.tag.tag_idArr.join(',')
        }

        $scope.showTagUl = (e) => {
            e = e || window.event;
            if(e.stopPropagation()){
                e.stopPropagation()
            }else{
                e.cancelBubble = true;
            }
            $scope.showtags = true
        }

        $scope.hideTagUl = (e) => {
            e = e || window.event;
            if(e.stopPropagation()){
                e.stopPropagation()
            }else{
                e.cancelBubble = true;
            }
            $scope.showtags = false
        }

        /*
        * 确认添加标签*/
        $scope.addTags = (tag) => {
            tag.picture_id = $scope.picture_id
            let addTagsUrl = 'http://mc.urzz.me:8080/picture/'+$scope.picture_id+'/tags'
            $http({
                method: 'POST',
                data: $httpParamSerializer(tag),
                url: addTagsUrl,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then( (resp) => {
                console.log(resp)
                if (resp.data.status) {
                    alert(resp.data.message)
                    $scope.addTag = false;
                    getPics()
                } else {
                    configDataService.errorMessage(resp.data)
                }

            }, (err) => {
                console.log(err)
            })
        }
    }
])

module.exports = picManguageController