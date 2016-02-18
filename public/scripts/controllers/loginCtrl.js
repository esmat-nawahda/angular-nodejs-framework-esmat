angular.module('myApp').controller('loginCtrl',
    function($rootScope, $scope, userModel, userService) {
        console.log("Login Ctrl");

        $scope.login = function(){
            alert("login");
            var loginModel = userModel.loginModel($scope.email1,$scope.password);
            console.log(loginModel);

            var loginService = userService.loginService(loginModel);

            loginService.then(function (d) {
                console.log(d.data);
                console.log(d.data.message);
                $scope.message = d.data.message;

                if($scope.message === "User doesn't exist")
                    swal({
                        title: "Error!",
                        text: "User doesn't exist",
                        type: "error",
                        timer: 2000
                    });
                else if($scope.message === "Invalid Password")
                    swal({
                        title: "Error!",
                        text: "Invalid Password",
                        type: "error",
                        timer: 2000
                    });
                else {
                    swal({
                        title: "Success!",
                        text: "Success",
                        type: "success",
                        timer: 5000
                    });
                    window.location = "index.html";
                }

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
