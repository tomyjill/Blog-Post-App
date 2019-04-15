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
                        <button class="goHome btn btn-outline-danger pull-right">Go Home</button>
                    </div>`
                );
            });
    });
}