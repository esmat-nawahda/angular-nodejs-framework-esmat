angular.module('servicesModule').factory('userService', function($http,authenticationService) {
    return {

        registrationService: function (registrationModel) {
            //var request = {};
            //request.opcode = "registrationRequest";
            //request.Entity = registrationModel;
            //console.log(request);
            //var userPromise = $http({
            //    method: 'POST',
            //    url: authenticationService.deploymentLink.link,
            //    //url: 'server/Jobseeker_Form.php',
            //    data: request
            //});
            //return userPromise;
            return $http.post('/api/register', registrationModel);
        },
        loginService: function (loginModel) {
            return $http.post('/api/login', loginModel);
        }


    }});