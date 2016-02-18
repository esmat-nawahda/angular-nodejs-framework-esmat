/**
 * Created by rana on 3/17/2015.
 */

angular.module('myApp').controller('viewProfileCtrl',
    function($scope,$routeParams,$rootScope, entitiesService, profileRequestService,postRequestsService, authenticationService) {


        $scope.check=function(){
            if (authenticationService.userProfile.user_type==1)
            {
                return 1;
            }
            else
            {
                return 2;
            }
        };




        $scope.imgUrl=authenticationService.userProfile.data.pictureUrl;
        $scope.myId=authenticationService.userProfile.user_id;
        $scope.user_id=$routeParams.id;
        $scope.pageScrolls=1;
        $('#loadMoreProfilePosts').hide();

        var profileEntity = entitiesService.profileEntity($scope.user_id);

        var profilePromise = profileRequestService.viewProfile(profileEntity);

        profilePromise.then(function (d) {

            console.log(d);
            var profile= d.data;
            $scope.jobSeekerId= profile.jobSeekerId;
            $scope.first_name= profile.first_name;
            $scope.last_name= profile.last_name;
            $scope.Email= profile.Email;
            $scope.profileUrl= profile.profileUrl;
            $scope.pictureUrl= profile.pictureUrl;
            $scope.summary= profile.summary;
            $scope.location= profile.location;
            $scope.industry= profile.industry;
            $scope.educations="";
            try{
                $scope.educations= profile.educations.split(',');
            }catch(err){

            }
            $scope.skills="";
            try{
                $scope.skills=profile.skills.split(',');
            }catch(err){

            }

        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });







        //$scope.myVar = true;
        //$scope.toggle = function() {
        //    $scope.myVar = !$scope.myVar;
        //}
        $scope.checkUser = function(fromId) {
            var jsId= authenticationService.userProfile.jobseekerId;
            console.log(fromId);
            console.log(jsId);
            if ( fromId==jsId ){
                return true;
            }
            else {
                return false;}

        };



        $scope.showModal = false;
        $scope.toggle = function(){
            $scope.showModal = !$scope.showModal;
            $scope.getMessages();
        };

        $scope.sendMessage = function () {
            var from_id= authenticationService.userProfile.user_id;
            var to_id=$scope.user_id;
            var messageEntity = entitiesService.messageEntity($scope.content,to_id,from_id);
            var messagePromise = profileRequestService.sendMessage(messageEntity);
            //console.log(from_id+","+to_id+","+$scope.content);
            $scope.content="";
            messagePromise.then(function (d) {console.log(d);
                var message= d.data;
                console.log(message);
                alert(d.data.message_id);
                $scope.messages.unshift({messageId:message.message_id,content:message.content,sendate:message.sendate,from_id:message.fromId,to_id:message.toId});
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

        $scope.getMessages = function () {

            var from_id = authenticationService.userProfile.user_id;
            //alert(from_id);
            //alert($scope.user_id);
            var messageEntity = entitiesService.getMessagesEntity(from_id,$scope.user_id);
            var messagePromise =profileRequestService.getMessages(messageEntity);

            messagePromise.then(function (d) {
                console.log(d.data);
                $scope.messages = d.data;
            });

        };

        $scope.updateSkills = function () {

            var js_id = authenticationService.userProfile.user_id;
            var mySkills=$scope.mySkills;
            //alert(js_id);
            //alert($scope.user_id);
            var updateSkillsEntity = entitiesService.updateSkillsEntity(js_id,mySkills);
            var skillsPromise =profileRequestService.updateSkills(updateSkillsEntity);

            skillsPromise.then(function (d) {
                console.log(d.data);
                swal({
                    title: "Success!",
                    text: "Skills Have been updated successfully",
                    type: "success",
                    timer: 3000
                });
            });

        };

        $scope.getSkills = function () {

            var js_id = authenticationService.userProfile.user_id;
            //alert(js_id);
            //alert($scope.user_id);
            var getSkillsEntity = entitiesService.getSkillsEntity(js_id);
            var skillsPromise =profileRequestService.getSkills(getSkillsEntity);

            skillsPromise.then(function (d) {
                console.log(d.data);
                $scope.mySkills= d.data;
            });

        };

        $scope.getSkills();




        $scope.getPosts = function () {


            var js_id = $routeParams.id;
            //alert(js_id);
            //alert($scope.user_id);
            var getPostForMeEntity = entitiesService.getPostForMeEntity(js_id);
            var postsPromise = profileRequestService.getPostForMe(getPostForMeEntity);

            postsPromise.then(function (d) {
                console.log(d.data);
                $rootScope.myposts = d.data;

            });


        }
        $scope.getPosts();

        $scope.deletePost=function(postId){
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {
                    var postPromise = postRequestsService.deletePost(postId);


                    //delete post

                    for (var i = 0; i < $rootScope.myposts.length; i++) {
                        if ($rootScope.myposts[i].id == postId) {
                            $rootScope.myposts.splice(i, 1);
                            break;
                        }
                    }

                    postPromise.then(function (d) {
                        console.log(d);
                        //swal({
                        //    title: "SUCCESS",
                        //    text: "Delete Done Successfully",
                        //    type: "success"
                        //});
                        //$scope.getNewsFeed();

                    }, function (d) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error"
                        });
                    });
                }
            );
        };




        $scope.loadMoreProfilePost=function(){
            //alert("load");
            $('#loadMoreProfilePosts').show();

            //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
            var js_id =$routeParams.id;
            //alert(js_id);
            var scrollEntity = entitiesService.pageProfileScrollEntity($scope.pageScrolls,js_id);
            //alert($scope.pageScrolls);
            var postForMePromise = postRequestsService.getAllPostsProfileByPageNumber(scrollEntity);

            postForMePromise.then(function (d) {
                console.log(d);
                $('#loadMoreProfilePosts').hide();
                $scope.pageScrolls=$scope.pageScrolls+1;
                //alert($scope.pageScrolls);
                $rootScope.myposts= $rootScope.myposts.concat(d.data);

                //$(window).bind('scroll', bindScroll);

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        };

    });



