angular.module('myApp').controller('postCtrl',
    function($rootScope, $scope, postModel, postService) {
        console.log("Post Ctrl");

        $scope.addPost = function(){

            var addPostModel = postModel.addPostModel($scope.postTitle,$scope.postDescription);
            console.log(addPostModel);

            var addPostService = postService.addPostService(addPostModel);

            addPostService.then(function (d) {
                console.log(d.data);
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
