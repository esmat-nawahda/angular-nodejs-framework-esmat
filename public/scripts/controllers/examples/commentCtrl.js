/**
 * Created by rana on 4/4/2015.
 */



angular.module('myApp').controller('commentCtrl',
    function($rootScope,$scope, commentEntitiesService, commentRequestService,$routeParams, authenticationService) {

        $scope.auth_user_id= authenticationService.userProfile.user_id;
        //alert($scope.auth_user_id);
        $scope.getComments=function(){
            var postId=$routeParams.postId;


            $scope.comments=[

            ];
            var getCommentEntity = commentEntitiesService.getComments(postId);
            var postPromise =commentRequestService.getComments(getCommentEntity);

            postPromise.then(function (d) {
                console.log(d);
                $scope.comments= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };

        




        $scope.addComment = function () {
            var postId=$routeParams.postId;
            //alert(postId);
            var user_id=authenticationService.userProfile.user_id;
            var full_name=authenticationService.userProfile.full_name;
            //alert(full_name);
            var commentEntity = commentEntitiesService.addComment(postId,$scope.content,user_id,full_name);

            var commentPromise = commentRequestService.addComment(commentEntity);


            commentPromise.then(function (d) {
                console.log(d);
                var comment= d.data;
                $scope.postId= comment.postId;
                $scope.content= comment.content;
                $scope.user_id= comment.userId;

                $scope.date=comment.date;

                $scope.comments.unshift({post_id:comment.postId,content:comment.content,user_id:comment.userId,date:comment.date,fullname:comment.fullname,comment_id:comment.commentId});

                $scope.content="";
            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };









        $scope.showModal = false;
        $scope.toggleModal = function(comment_id,content){
            $scope.showModal = !$scope.showModal;
            $scope.editedContent=content;
            $scope.editedCommentId=comment_id;
        };

        $scope.editComment=function(editedCommentId,editedContent){
            //alert(editedCommentId+"  "+editedContent);
            for (var i=0; i<$scope.comments.length; i++) {
                if ($scope.comments[i].comment_id == editedCommentId) {
                    $scope.comments[i].content = editedContent;
                    break;
                }
            }
            $scope.showModal = false;

            var editCommentEntity = commentEntitiesService.editComment(editedCommentId,editedContent);
            var commentPromise = commentRequestService.editComment(editCommentEntity);

           commentPromise.then(function (d) {
               console.log(d);

               //edit comment in client



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

        $scope.deleteComment=function(commentId) {
            //console.log(commentId);
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {

                    var deleteCommentEntity = commentEntitiesService.deleteCommentEntity(commentId);
                    var commentPromise = commentRequestService.deleteComment(deleteCommentEntity);


                    //delete comment
                    for (var i = 0; i < $scope.comments.length; i++) {
                        if ($scope.comments[i].comment_id == commentId) {
                            $scope.comments.splice(i, 1);
                            break;
                        }
                    }
                    commentPromise.then(function (d) {
                        //console.log(d);

                        //
                        //swal({
                        //    title: "Comment Has Been Deleted Successfully",
                        //    text: "SUCCESS",
                        //    type: "success"
                        //});

                    }, function (d) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error"
                        });
                    });
                }
            );

        }


});


