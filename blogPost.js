// https://jsonplaceholder.typicode.com/posts/{{ postId }}
// https://jsonplaceholder.typicode.com/users/{{ userId }}
// https://jsonplaceholder.typicode.com/comments?postId={{ postId }}

$(document).ready(function(){
    const url = 'https://jsonplaceholder.typicode.com/posts';

	$.getJSON(url, function(posts) {

        posts.forEach(post => {
            $('#postsContainer').append(
                `<div class='postContainer'>
                    <div class="postTitle">${post.title}</div>
                    <div class= "postBody">${post.body}</div>
                    <br>
                    <div class= "postId"> Posted by ${post.userId}</div>
                    <button class="comment btn btn-outline-info pull-right">Go to post</button>
                </div>`
            );
            console.log(post)
        });
    });
    
    $.getJSON(postIdUrl, function(posts) {
        const postIdUrl = 'https://jsonplaceholder.typicode.com/comments?postId';
        const userIdUrl = 'https://jsonplaceholder.typicode.com/users';
        console.log(postIdUrl);
        $('.comment').on('click', function(){
            const comments = posts.map(post => {
                if (post.id == postId) {
                    posts.forEach(post => {
                        $('#commentsContainer').append(
                            `<div class='commentContainer'>
                                <div class="body">${post.body}</div>
                                <div class="name"> Posted by ${post.name}</div>
                                <div class="email">${post.email}</div>
                            </div>`
                        );
                    });
                } 
            })
        });
    });
    
});

   
        

			