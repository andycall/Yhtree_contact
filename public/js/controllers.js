/**
 * Created by andycall on 15/4/25.
 */

var IndexController = angular.module('IndexControllers', []);


IndexController.controller('IndexCtrl', ['$scrope', '$http', function($scrope, $http) {
    $scope.phone = [
        {
            username : "andycall",
            phone : "1883284298"
        },
        {
            username : "helloworld",
            phone : "1923923230"
        }

    ];


}]);