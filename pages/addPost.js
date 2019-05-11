$(document).on('click', '#addPost', function() {
    $('#container').children().remove();
    $('#container').append(
        `<div id="postForm" class="col-md-8">
        <form onsubmit="return false;" >
            <div class="form-group">
                <label for="postTitle">Post title:</label>
                <input type="text" class="form-control" id="postTitle" required>
            </div>
            <div class="form-group">
                <label for="postBody">Post body:</label>
                <textarea class="form-control" rows="10" cols="300" id="postBody" placeholder="Write your post here..." required></textarea>   
            </div>
            <button id="submitPost" class="btn btn-primary">Submit</button>
        </form>`	  
    );
         //navigate('post'); 
});

$(document).on('click', '#submitPost', function() {
    const postBodyInputValue = $('#postBody').val();
    const postTitleInputValue = $('#postTitle').val();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
    
    $('#container').children().remove();
    $('#container').append(
        `<div class="postContainer">
            <div class="postTitle">${postTitleInputValue}</div>
            <br>
            <div class="postBody">${postBodyInputValue}</div>
            <br>
            <div class="name"> Posted by ${currentUser.firstName}</div>
            <div class="email">${currentUser.email}</div>
            <div class="today">${today}</div>
            <button class="goHome btn btn-outline-danger pull-right">Go Home</button>
        </div>`
    );
});
