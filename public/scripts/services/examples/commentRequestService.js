/**
 * Created by happy on 4/2/2015.
 */


angular.module('servicesModule').factory('commentRequestService', function($http,authenticationService) {
    return {

        addComment: function (commentEntity) {
            var request = {};
            request.opcode = "addCommentRequest";

            request.Entity =  commentEntity;
            var commentPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        }
        ,
        getComments: function (getCommentEntity) {
            var request = {};
            request.opcode = "getCommentsRequest";
            request.Entity =  getCommentEntity;
            var commentPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        },

        deleteComment: function(deleteCommentEntity) {
            var request = {};

            request.opcode = "deleteCommentRequest";

            request.Entity =deleteCommentEntity;
            var commentPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        },


        editComment: function(editCommentEntity) {
            var request = {};

            request.opcode = "editCommentRequest";
            request.Entity =editCommentEntity;
            var commentPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        }



    }});