/**
 * Created by sunqun on 2017/12/29.
 */
routing.$inject = ['$locationProvider', '$routeProvider'];

export default function routing ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/uploadLocalImage',{
            template: require('./uploadLocalImage/index.html'),
            controller: "uploadLocalImageCtrl"
        })
        .when('/login', {
            template: require('./login/index.html'),
            controller: "loginCtrl"
        })
        .when('/register', {
            template: require('./register/index.html'),
            controller: "registerCtrl"
        })
        .when('/loan/entrance', {
            template: require('./loan/entrance/index.html'),
            controller: "entranceCtrl"
        })
        .when('/center',{
            template: require('./center/index.html'),
            controller: "centerCtrl"
        })
        .otherwise('/uploadLocalImage');
    $locationProvider.html5Mode(true);
}