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

    $(document).on('click', '#register', function() {
        $('#container').children().remove();
        $('#container').append(
            `<div id="registerForm" class="col-md-4 col-sm-4">
            <form onsubmit="return false;" >
                <div class="form-group">
                    <label for="firstName">First name:</label>
                    <input type="text" class="form-control" id="firstName">
                    <span id="error_firstName" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="lastName">Last name:</label>
                    <input type="text" class="form-control" id="lastName">
                    <span id="error_lastName" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" placeholder="Example 123Ab@gmail.com">
                    <span id="error_email" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd">
                    <span id="error_pwd" class="invalid-feedback"></span>
                    <small id="pwdHelp" class="form-text text-muted">Password should contain minimum 6 characters.</small>
                </div>
                <button id="submit" class="btn btn-primary">Submit</button>
			</form>`	  
        );
        $('#submit').attr('disabled', true);
        $("#firstName").focusout(function(){
            const firstNameInputValue = $(this).val();
            const hasNumber = /\d/;
            if(firstNameInputValue ==''){
                $(this).addClass('is-invalid');
                $("#error_firstName").text("* Enter your first name!");
            } else if(firstNameInputValue.length < 3){
                $(this).addClass('is-invalid');   
                $("#error_firstName").text("* First name should contain at least 3 characters!");
            } else if(hasNumber.test(firstNameInputValue) == true){
                $(this).addClass('is-invalid');    
                $("#error_firstName").text("* First name should not contain numbers!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_firstName").text("");
            }
        });
        $("#lastName").focusout(function(){
            const lastNameInputValue = $(this).val();
            const hasNumber = /\d/;
            if(lastNameInputValue =='') {
                $(this).addClass('is-invalid');        
                $("#error_lastName").text("* Enter your last name!");
            } else if(lastNameInputValue.length < 3 ){
                $(this).addClass('is-invalid');
                $("#error_lastName").text("* Last name should contain at least 3 characters!");
            } else if(hasNumber.test(lastNameInputValue) == true){
                $(this).addClass('is-invalid');
                $("#error_lastName").text("* Last name should not contain numbers!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_lastName").text("");
            }
        });
        $("#email").focusout(function(){
           //console.log('working'); 
            const emailInputValue = $(this).val();
            const emailIsValid = /\S+@\S+\.\S+/.test(emailInputValue)
            if (emailInputValue == '') {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Enter your email!");
            } else if(emailInputValue.length < 5) {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Email should contain at least 5 characters!");
            } else if(emailIsValid == false) {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Enter a valid email!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_email").text("");
            }
        });
        $("#pwd").focusout(function(){
            const pwdInputValue = $(this).val();
            const hasNumber = /\d/;
            //console.log('working');
            if(pwdInputValue =='') {
                $(this).addClass('is-invalid');
                $("#error_pwd").text("* Enter your password!");
            } else if(pwdInputValue.length < 6) {   
                $(this).addClass('is-invalid');
                $("#pwdHelp").removeClass('text-muted');
                $("#pwdHelp").addClass('text-danger');
            } else if(hasNumber.test(pwdInputValue) == false) {
                $(this).addClass('is-invalid');
                $("#error_pwd").text("* Password should include numbers!");  
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $("#pwdHelp").removeClass('text-danger');
                $('#submit').attr('disabled',false);
                $("#error_pwd").text("");
            }
        });
        $("#submit").on('click', function() {
            const isValidClasses = $(document).find('.is-valid');
            const isInvalidClasses = $(document).find('.is-invalid');
            const firstName = $('#firstName').val();
            const lastName = $("#lastName").val();
            const email = $('#email').val();
            const pwd = $('#pwd').val();
            console.log(isInvalidClasses.length);
         if (isValidClasses.length < 4 || isInvalidClasses.length !== 0 ) {
             alert('Please fill in the form correctly!');   
         } else if (isValidClasses.length == 4 && isInvalidClasses.length == 0) {
             $('#submit').attr('disabled', false);
             alert("Thank you " + firstName + ' ' + lastName);
             storeRegisterForm(firstName, lastName, email, pwd);
         }
        });
    });

    $(document).on('click', '#logIn', function() {
        $('#container').children().remove();
        $('#container').append(
            `<div id="logInForm" class="col-md-4 col-sm-4">
            <form onsubmit="return false;" >
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="logInEmail" placeholder="Example 123Ab@gmail.com">
                    <span id="error_email" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="logInPwd">
                    <span id="error_pwd" class="invalid-feedback"></span>
                    <small id="pwdHelp" class="form-text text-muted">Password should contain minimum 6 characters.</small>
                </div>
                <button id="logInSubmit" class="btn btn-primary">Login</button>
			</form>`	  
        );
    });

    $(document).on('click', '#logInSubmit', function() {
        const email = $('#loginEmail').val();
        const pwd = $('#loginPwd').val();
        loginCheck(email, pwd);
    });

    $(document).on('click', '.logOff', function() {
        $('#container').children().remove();
        renderHomePage();
        $(this).text("Login");   
        deleteStoredCurrentUser();
        $('#logIn').removeClass('logOff');
    });
});

const storeRegisterForm = () => {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const pwd = $('#pwd').val();

    addUserToStorage(firstName, lastName, email, pwd);
}

const addUserToStorage = (firstName, lastName, email, pwd) => {
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: pwd,
        logInStatus: false,
    };
          // array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers)); 
}

const loginCheck = (email, pwd) => {
    const logInEmail = $('#logInEmail').val();
    const logInPwd = $('#logInPwd').val();
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []; 

    if (storedUsers.length === 0) {
        alert('Please register');
        return;
    }

    const currentUser = storedUsers.find(user => user.email === logInEmail);

    if (currentUser === undefined) {
        alert('It seems like you dont exists');
        return;
    }

    if (currentUser.password === logInPwd) {
        alert('You are loged in');
        $('#container').children().remove();
        renderHomePage();
        currentUser.logInStatus = true;
        $('#logIn').text("Log Off");
        $('#logIn').addClass('logOff');
    } else {
        alert('Incorrect password');
    }  

    // somehow mark that this user is logged in 
    // so when i refresh the browser i am still logged in in your website
    // set isLoggedIn: true
    // navigate to home page

    localStorage.setItem('user', JSON.stringify(currentUser));
}

const deleteStoredCurrentUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || [];
    localStorage.removeItem('user'); 
}

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

const renderHomePage = (params) => {

    $('#container').append('<div id="welcome">Fresh Post for You</div>');
    $('#container').append(
        `<div>
            <button id="logIn" class="btn btn-success pull-right">Login</button>
            <button id="register" class="btn btn-warning pull-right">Register</button>
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


			