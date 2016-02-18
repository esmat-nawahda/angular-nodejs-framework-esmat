angular.module('myApp').controller('userCtrl',
    function($rootScope, $scope, userModel, userService) {
        console.log("User Ctrl");

        $scope.register = function(){

            var registrationModel = userModel.registrationModel($scope.username,$scope.password,$scope.email,$scope.fullname);
            console.log(registrationModel);

            var registrationService = userService.registrationService(registrationModel);

            registrationService.then(function (d) {
                console.log(d.data);
                console.log(d.data.message);
                $scope.message = d.data.message;
                swal({
                    title: "Success!",
                    text: "Success",
                    type: "success",
                    timer: 5000
                });

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };




    });
