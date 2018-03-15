/**
 * Created by Administrator on 2018/1/16.
 */
"use strict";

let albumManguageController = angular.module('albumManguageCtrlModule', []);

albumManguageController.controller('albumManguageCtrl', ['$scope',
    function ($scope) {

        /*
        * 弹框拖动*/
        //拖拽功能(主要是触发三个事件：onmousedown\onmousemove\onmouseup)
        var drag = document.getElementById('drag-popup');

        //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
        drag.onmousedown = function(e) {
            var e = e || window.event; //兼容ie浏览器
            var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            var diffY = e.clientY - drag.offsetTop;

            /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
             解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
             可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
             限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/
            if(typeof drag.setCapture!='undefined'){
                drag.setCapture();
            }

            document.onmousemove = function(e) {
                var e = e || window.event; //兼容ie浏览器
                var left=e.clientX-diffX;
                var top=e.clientY-diffY;

                //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                if(left<0){
                    left=0;
                }else if(left >window.innerWidth-drag.offsetWidth){
                    left = window.innerWidth-drag.offsetWidth;
                }
                if(top<0){
                    top=0;
                }else if(top >window.innerHeight-drag.offsetHeight){
                    top = window.innerHeight-drag.offsetHeight;
                }

                //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                drag.style.left = left+ 'px';
                drag.style.top = top + 'px';
            };

            document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动
                this.onmousemove = null;
                this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

                //修复低版本ie bug
                if(typeof drag.releaseCapture!='undefined'){
                    drag.releaseCapture();
                }
            };
        };

        $scope.create = false

        $scope.closePopup = (id) => {
            $scope.create = false
        }

        $scope.showPopup = (id) => {
            $scope.create = true
        }
    }
])

module.exports = albumManguageController