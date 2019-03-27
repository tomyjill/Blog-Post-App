// https://jsonplaceholder.typicode.com/posts/{{ postId }}
// https://jsonplaceholder.typicode.com/users/{{ userId }}
// https://jsonplaceholder.typicode.com/comments?postId={{ postId }}

$(document).ready(function(){
    
    navigate('home');

    $(document).on('click', '.goToPost', function() {
        const postId = $(this).parent().attr('postId');
        navigate('post', { postId: postId });

        // $.getJSON(idUrl, function(posts) {
        //     posts.forEach(post => {
        //         window.open('postNewPage.html');         
        //         $('#postIdContainer').append(
        //             `<div class="body">${post.body}</div>
        //             <div class="name"> Posted by ${post.name}</div>
        //             <div class="email">${post.email}</div>`
        //         );
        //     });
        // });
    });

    $(document).on('click', '#goHome', function() {
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
    console.log(postId);
    // const url = 'https://jsonplaceholder.typicode.com/comments?postId=';
    // const idUrl = url.concat(postId);
    $('#container').append('<div>welcome to post page</div>')
    $('#container').append('<div id="goHome">go home</div>')
}

const renderHomePage = (params) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
	$.getJSON(url, function(posts) {
        posts.forEach(post => {
            $('#container').append(
          //  $('#postsContainer').append(
                `<div class='postContainer' postId=${post.id}>
                    <div class="postTitle">${post.title}</div>
                    <div class= "postBody">${post.body}</div>
                    <br>
                    <div class= "postId"> Posted by ${post.userId}</div>
                    <button class="goToPost btn btn-outline-info pull-right">Go to post</button>
                </div>`
            );
        });
    });
}
			