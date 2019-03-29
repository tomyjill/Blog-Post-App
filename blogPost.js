// https://jsonplaceholder.typicode.com/posts/{{ postId }}
// https://jsonplaceholder.typicode.com/users/{{ userId }}
// https://jsonplaceholder.typicode.com/comments?postId={{ postId }}

$(document).ready(function(){
    
    navigate('home');

    $(document).on('click', '.goToPost', function() {
        const postId = $(this).parent().attr('postId');
        navigate('post', { postId });
    });

    $(document).on('click', '.goHome', function() {
        navigate('home');
    });
});

const navigate = (page, params = {}) => {
    $('#container').children().remove();
    switch (page) {
        case 'home':
            renderHomePage(params);
        break;
        case 'post':
            renderPostPage(params);
        break;
    }
}
        
const renderPostPage = (params) => {
    const { postId } = params;
    //console.log(postId);
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

    $('#container').append('<div id="welcome">Welcome to Post Page</div>');

    $.getJSON(url, function(posts) {
            posts.forEach(post => {        
                $('#container').append(
                    `<div class="postContainer">
                        <div class="postBody">${post.body}</div>
                        <br>
                        <div class="name"> Posted by ${post.name}</div>
                        <div class="email">${post.email}</div>
                        <button class="goHome btn btn-outline-info pull-right">Go Home</button>
                    </div>`
                );
            });
    });
}

const renderHomePage = (params) => {

    $('#container').append('<div id="welcome">Fresh Post for You</div>');
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
	$.getJSON(url, function(posts) {
        posts.forEach(post => {
            $('#container').append(
                `<div postId="${post.id}" class="postContainer">
                    <div class="postTitle">${post.title}</div>
                    <div class= "postBody">${post.body}</div>
                    <br>
                    <div class= "userId"> Posted by ${post.userId}</div>
                    <button class="goToPost btn btn-outline-info pull-right">Go to post</button>
                </div>`
            );
        });
    });
}
			