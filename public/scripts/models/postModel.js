
angular.module('modelsModule').factory('postModel', function() {

    return {
        addPostModel: function(postTitle,postDescription) {
            var post = {};     // new object
            post.postTitle = postTitle;
            post.postDescription = postDescription;
            return post;
        }


    };


});
