angular.module('servicesModule').factory('postService', function($http,authenticationService) {
    return {

        addPostService: function (addPostModel) {
            var request = {};
            request.opcode = "addPostRequest";
            request.Entity = addPostModel;
            var postPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        }


    }});