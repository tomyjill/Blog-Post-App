const renderHomePage = (params) => {

    $('#container').append('<div id="welcome">Fresh Post for You</div>');
    $('#container').append(
        !currentUser ? 
            `<div>
                <button id="logIn" class="btn btn-success pull-right">Login</button>
                <button id="register" class="btn btn-warning pull-right">Register</button>
            </div>`
        :
            `<div>
                <h2>Hi ${currentUser.firstName}</h2>
                <button id="logOff" class="btn btn-primary pull-right">Log Off</button>
            </div>`
    );
        
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
