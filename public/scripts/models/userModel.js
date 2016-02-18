
angular.module('modelsModule').factory('userModel', function() {

    return {
        registrationModel: function(username,password,email,fullname) {
            var user = {};     // new object
            user.username = username;
            user.password = password;
            user.email = email;
            user.fullname = fullname;
            return user;
        },
        loginModel: function(email,password) {
            var user = {};     // new object
            user.email = email;
            user.password = password;
            return user;
        }


    };


});
