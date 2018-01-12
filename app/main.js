/**
 * Created by sunqun on 2017/12/19.
 */
import angular from 'angular';
import ngRoute from 'angular-route';
import routing from './app.route';
//import ngFileUploadShim from 'ng-file-upload-shim';
import ngFileUpload from 'ng-file-upload';
import './style.css';
import './login/loginCtrl.css';
import './register/registerCtrl.css';
import './center/centerCtrl.css';

angular.module("app", [
    ngRoute,
    //ngFileUploadShim,
    ngFileUpload,
    require('./login/loginCtrl').name,
    require('./register/registerCtrl').name,
    require('./center/centerCtrl').name,
    //require('./loan/index').name,
    require('./uploadLocalImage/uploadLocalImageCtrl').name
])
    .config(routing);
