/**
 * Created by sunqun on 2017/12/19.
 */
import angular from 'angular';
import ngRoute from 'angular-route';
import routing from './app.route';
//import ngFileUploadShim from 'ng-file-upload-shim';
import FileUploader from 'ng-file-upload';
import './style.css';
import './login/loginCtrl.css';
import './register/registerCtrl.css';
import './center/centerCtrl.css';
import './uploadLocalImage/uploadLocalImageCtrl.css';
import './manguage/manguageCtrl.css';
import './albumManguage/albumManguageCtrl.css';
import './picManguage/picManguageCtrl.css';
import './main/mainCtrl.css';

angular.module("app", [
    ngRoute,
    //ngFileUploadShim,
    FileUploader,
    require('./login/loginCtrl').name,
    require('./register/registerCtrl').name,
    require('./center/centerCtrl').name,
    //require('./loan/index').name,
    require('./uploadLocalImage/uploadLocalImageCtrl').name,
    require('./manguage/manguageCtrl').name,
    require('./albumManguage/albumManguageCtrl').name,
    require('./picManguage/picManguageCtrl').name,
    require('./main/mainCtrl').name,
])
    .config(routing)
    .run(['$rootScope',
        '$http',
        function($rootScope,
                 $http){
            let logo = document.getElementById('logo');
            //logo.src = logoImg
            console.log(logo)
            $rootScope.loginOut = () => {
                let loginOutUrl = 'http://mc.urzz.me:8080/user/logout';
                $http({
                    method: "GET",
                    url: loginOutUrl,
                    withCredentials: true,
                    headers: {
                        "Content-Type": 'x-www-form-urlencoded'
                    }
                })
                .then( (resp) => {
                    console.log(resp)
                    if(resp.data.status){
                        alert(resp.data.message)
                        $rootScope.showLogin = false
                        $rootScope.username = ''
                    }
                }, (err) => {
                    console.log(err)
                })
            }

            $rootScope.$on('$routeChangeStart',function() {
                //if (currRoute.isNeedLogin && !cookieService.get('userId')) {
                //    //在这里操作显示登陆的那个变量
                //}
                console.log('..')
            });
        }
    ])
    .directive('pagination', () => {
        return {
            restrict: 'E',
            transclude: true,
            template: require("./templates/pagination.html")
        }
    })
